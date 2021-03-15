"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useOrientation = exports.useSize = void 0;
const react_1 = require("react");
function getBodyAvailSize() {
    return {
        width: document.body.clientWidth,
        height: document.body.clientHeight,
    };
}
function getBodyScrollSize() {
    return {
        width: document.body.scrollWidth,
        height: document.body.scrollHeight,
    };
}
function getWindowAvailSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
}
const getSizeMap = {
    BODY_AVAIL_SIZE: getBodyAvailSize,
    BODY_SCROLL_SIZE: getBodyScrollSize,
    WINDOW_AVAIL_SIZE: getWindowAvailSize,
};
function useSize(type = "WINDOW_AVAIL_SIZE") {
    const [state, setState] = react_1.useState({
        width: 1,
        height: 1,
    });
    react_1.useEffect(() => {
        const resizeHandler = () => {
            const getSizeFunc = getSizeMap[type];
            if (getSizeFunc) {
                setState(getSizeFunc);
            }
            else {
                console.error(`useSize parameter error: type expected SizeType, got ${type}`);
            }
        };
        resizeHandler();
        window.addEventListener("resize", resizeHandler);
        // 微信内置浏览器环境下, 屏幕旋转不会触发 resize 事件, 所以额外新增一个 orientationchange 监听
        window.addEventListener("orientationchange", resizeHandler);
        return () => {
            window.removeEventListener("resize", resizeHandler);
            window.removeEventListener("orientationchange", resizeHandler);
        };
    }, [type]);
    return state;
}
exports.useSize = useSize;
function useOrientation() {
    const docSize = useSize("WINDOW_AVAIL_SIZE");
    return docSize.width > docSize.height ? "LANDSCAPE" : "PORTRAIT";
}
exports.useOrientation = useOrientation;
//# sourceMappingURL=use-size.js.map