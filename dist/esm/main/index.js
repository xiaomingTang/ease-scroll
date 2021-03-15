import { conditions } from "@Src/utils/logic";
import React, { useCallback, useMemo, useRef, useState, } from "react";
export function EaseScroll({ alwaysRender = false, pageSize: { width: pageWidth, height: pageHeight, }, pages, }) {
    const [curPageIndex, setCurPageIndex] = useState(0);
    // percentages === [thePercentage, nextPercentage]
    const [percentages, setPercentages] = useState([0, 1]);
    const ref = useRef();
    const steps = useMemo(() => pages.map((page, pageIndex) => pages.reduce((prev, cur, idx) => {
        if (idx < pageIndex) {
            return prev + cur.colspan;
        }
        return prev;
    }, 0)), [pages]);
    const onScroll = useCallback((e) => {
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
    const scrollTo = useCallback((tarPageIndex, tarStepIndex = 0, behavior = "smooth") => {
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
    return React.createElement("div", { ref: ref, onScroll: onScroll, style: {
            width: `${pageWidth}px`,
            height: `${pageHeight}px`,
            overflowX: "hidden",
            overflowY: "auto",
        } }, pages.map((page, pageIndex) => {
        var _a;
        return (React.createElement("div", Object.assign({ key: pageIndex }, page.pageProps, { style: {
                position: "relative",
                overflow: "visible",
                width: `${pageWidth}px`,
                height: `${pageHeight * page.colspan}px`,
                ...(_a = page.pageProps) === null || _a === void 0 ? void 0 : _a.style,
            } }), (() => {
            const thePercentage = conditions([
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
            return React.createElement(React.Fragment, null);
        })()));
    }));
}
//# sourceMappingURL=index.js.map