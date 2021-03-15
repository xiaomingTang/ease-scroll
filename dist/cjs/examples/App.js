"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const root_1 = require("react-hot-loader/root");
const react_1 = __importDefault(require("react"));
require("./global/global");
const index_1 = require("../main/index");
const use_size_1 = require("../utils/use-size");
const EaseElem_1 = require("../components/EaseElem");
const math_1 = require("../utils/math");
const gene_style_1 = require("../utils/gene-style");
const f_1_jpg_1 = __importDefault(require("../assets/f-1.jpg"));
const App_module_less_1 = __importDefault(require("./App.module.less"));
const animations = [
    gene_style_1.simpleFadeIn, gene_style_1.simpleFadeOut, gene_style_1.simpleLeftToRight, gene_style_1.simpleRightToLeft, gene_style_1.simpleTopToBottom, gene_style_1.simpleBottomToTop, gene_style_1.simpleZoomIn, gene_style_1.simpleZoomOut, gene_style_1.simpleRotate, gene_style_1.simpleFlipX, gene_style_1.simpleFlipY,
];
const genePages = (size) => animations.map((_, idx) => {
    const fromColor = `hsla(${math_1.randomInt(0, 180)}, ${math_1.randomInt(20, 50)}%, ${math_1.randomInt(50, 80)}%, 1)`;
    const toColor = `hsla(${math_1.randomInt(180, 360)}, ${math_1.randomInt(20, 50)}%, ${math_1.randomInt(50, 80)}%, 1)`;
    return {
        bg: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        geneStyle: animations[idx % animations.length],
    };
}).map(({ bg, geneStyle }) => ({
    colspan: math_1.randomPick(2, 4),
    elem(options) {
        return (react_1.default.createElement(EaseElem_1.EaseFixedFullStepElem, { size: size, style: { background: bg } },
            react_1.default.createElement("img", { src: f_1_jpg_1.default, alt: "", className: App_module_less_1.default.fg, style: geneStyle.func(options) }),
            react_1.default.createElement("div", { className: App_module_less_1.default.t },
                react_1.default.createElement("div", null,
                    "\u7B2C ",
                    options.thePageIndex,
                    " \u9875, \u8BE5\u9875\u6709 ",
                    options.thePage.colspan,
                    " step"),
                react_1.default.createElement("div", null,
                    "\u5DF2\u6EDA\u52A8\u81F3\u7B2C ",
                    options.curPageIndex,
                    " \u9875; \u672C\u9875\u5DF2\u6EDA\u52A8: ",
                    Math.round(options.thePercentage * 100),
                    "%"),
                react_1.default.createElement("div", null,
                    "\u793A\u4F8B\u56FE\u7247\u7684\u52A8\u753B\u4E3A ",
                    geneStyle.desc),
                react_1.default.createElement("div", null, "(step \u51B3\u5B9A\u4E86\u52A8\u753B\u5B8C\u6210\u65F6\u7684\u6EDA\u52A8\u8DDD\u79BB)"))));
    },
}));
function App() {
    const size = use_size_1.useSize();
    return react_1.default.createElement(index_1.EaseScroll, { pageSize: size, pages: [
            ...genePages(size),
            {
                colspan: 0,
                alwaysRender: true,
                elem(options) {
                    return options.curPageIndex >= 1 && react_1.default.createElement("div", { className: App_module_less_1.default.backTop, onClick: () => options.scrollTo(0) }, "\u8FD4\u56DE\u9876\u90E8");
                },
            },
        ] });
}
exports.default = root_1.hot(App);
//# sourceMappingURL=App.js.map