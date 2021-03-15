import { hot } from "react-hot-loader/root";
import React from "react";
import "./global/global";
import { EaseScroll } from "../main/index";
import { useSize } from "../utils/use-size";
import { EaseFixedFullStepElem } from "../components/EaseElem";
import { randomInt, randomPick } from "../utils/math";
import { simpleFadeIn, simpleFadeOut, simpleLeftToRight, simpleRightToLeft, simpleTopToBottom, simpleBottomToTop, simpleZoomIn, simpleZoomOut, simpleRotate, simpleFlipX, simpleFlipY, } from "../utils/gene-style";
import F1 from "../assets/f-1.jpg";
import Styles from "./App.module.less";
const animations = [
    simpleFadeIn, simpleFadeOut, simpleLeftToRight, simpleRightToLeft, simpleTopToBottom, simpleBottomToTop, simpleZoomIn, simpleZoomOut, simpleRotate, simpleFlipX, simpleFlipY,
];
const genePages = (size) => animations.map((_, idx) => {
    const fromColor = `hsla(${randomInt(0, 180)}, ${randomInt(20, 50)}%, ${randomInt(50, 80)}%, 1)`;
    const toColor = `hsla(${randomInt(180, 360)}, ${randomInt(20, 50)}%, ${randomInt(50, 80)}%, 1)`;
    return {
        bg: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
        geneStyle: animations[idx % animations.length],
    };
}).map(({ bg, geneStyle }) => ({
    colspan: randomPick(2, 4),
    elem(options) {
        return (React.createElement(EaseFixedFullStepElem, { size: size, style: { background: bg } },
            React.createElement("img", { src: F1, alt: "", className: Styles.fg, style: geneStyle.func(options) }),
            React.createElement("div", { className: Styles.t },
                React.createElement("div", null,
                    "\u7B2C ",
                    options.thePageIndex,
                    " \u9875, \u8BE5\u9875\u6709 ",
                    options.thePage.colspan,
                    " step"),
                React.createElement("div", null,
                    "\u5DF2\u6EDA\u52A8\u81F3\u7B2C ",
                    options.curPageIndex,
                    " \u9875; \u672C\u9875\u5DF2\u6EDA\u52A8: ",
                    Math.round(options.thePercentage * 100),
                    "%"),
                React.createElement("div", null,
                    "\u793A\u4F8B\u56FE\u7247\u7684\u52A8\u753B\u4E3A ",
                    geneStyle.desc),
                React.createElement("div", null, "(step \u51B3\u5B9A\u4E86\u52A8\u753B\u5B8C\u6210\u65F6\u7684\u6EDA\u52A8\u8DDD\u79BB)"))));
    },
}));
function App() {
    const size = useSize();
    return React.createElement(EaseScroll, { pageSize: size, pages: [
            ...genePages(size),
            {
                colspan: 0,
                alwaysRender: true,
                elem(options) {
                    return options.curPageIndex >= 1 && React.createElement("div", { className: Styles.backTop, onClick: () => options.scrollTo(0) }, "\u8FD4\u56DE\u9876\u90E8");
                },
            },
        ] });
}
export default hot(App);
//# sourceMappingURL=App.js.map