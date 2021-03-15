"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EaseScroll = void 0;
const logic_1 = require("../utils/logic");
const react_1 = __importStar(require("react"));
function EaseScroll({ alwaysRender = false, pageSize: { width: pageWidth, height: pageHeight, }, pages, }) {
    const [curPageIndex, setCurPageIndex] = react_1.useState(0);
    // percentages === [thePercentage, nextPercentage]
    const [percentages, setPercentages] = react_1.useState([0, 1]);
    const ref = react_1.useRef();
    const steps = react_1.useMemo(() => pages.map((page, pageIndex) => pages.reduce((prev, cur, idx) => {
        if (idx < pageIndex) {
            return prev + cur.colspan;
        }
        return prev;
    }, 0)), [pages]);
    const onScroll = react_1.useCallback((e) => {
        const { scrollTop = 0, } = e.target;
        let varCurPageIndex = 0;
        let curStep = 0;
        const scrolledStep = Math.floor(scrollTop / pageHeight);
        for (let i = 0, len = pages.length; i < len; i += 1) {
            const nextStep = curStep + pages[i].colspan;
            if (scrolledStep >= curStep && scrolledStep < nextStep) {
                varCurPageIndex = i;
                break;
            }
            curStep = nextStep;
        }
        const curPage = pages[varCurPageIndex];
        const nextPage = pages[varCurPageIndex + 1];
        const thePercentage = curPage.colspan > 0
            ? (scrollTop - curStep * pageHeight) / (curPage.colspan * pageHeight)
            : 1;
        const nextPercentage = nextPage.colspan > 0
            ? (scrollTop - (curStep + curPage.colspan) * pageHeight) / (nextPage.colspan * pageHeight)
            : 1;
        setCurPageIndex(varCurPageIndex);
        setPercentages([thePercentage, nextPercentage]);
    }, [pageHeight, pages]);
    const scrollTo = react_1.useCallback((tarPageIndex, tarStepIndex = 0, behavior = "smooth") => {
        const elem = ref.current;
        if (elem) {
            const tarStep = steps.reduce((prev, cur, index) => (index <= tarPageIndex ? prev + cur : prev), 0) + tarStepIndex;
            elem.scrollTo({
                top: tarStep * pageHeight,
                behavior,
            });
        }
    }, [steps, pageHeight]);
    // @ts-ignore
    return react_1.default.createElement("div", { ref: ref, onScroll: onScroll, style: {
            width: `${pageWidth}px`,
            height: `${pageHeight}px`,
            overflowX: "hidden",
            overflowY: "auto",
        } }, pages.map((page, pageIndex) => {
        var _a;
        return (react_1.default.createElement("div", Object.assign({ key: pageIndex }, page.pageProps, { style: {
                position: "relative",
                overflow: "visible",
                width: `${pageWidth}px`,
                height: `${pageHeight * page.colspan}px`,
                ...(_a = page.pageProps) === null || _a === void 0 ? void 0 : _a.style,
            } }), (() => {
            const thePercentage = logic_1.conditions([
                [pageIndex < curPageIndex, 1],
                [pageIndex === curPageIndex, percentages[0]],
                [pageIndex === curPageIndex + 1, percentages[1]],
            ], -1);
            if (alwaysRender
                || page.alwaysRender
                || pageIndex === curPageIndex - 1
                || pageIndex === curPageIndex
                || pageIndex === curPageIndex + 1) {
                return page.elem({
                    thePageIndex: pageIndex,
                    thePage: pages[pageIndex],
                    thePercentage,
                    curPage: pages[curPageIndex],
                    curPageIndex,
                    scrollTo,
                });
            }
            return react_1.default.createElement(react_1.default.Fragment, null);
        })()));
    }));
}
exports.EaseScroll = EaseScroll;
//# sourceMappingURL=index.js.map