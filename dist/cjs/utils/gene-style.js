"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.simpleFlipY = exports.simpleFlipX = exports.simpleRotate = exports.simpleZoomOut = exports.simpleZoomIn = exports.simpleBottomToTop = exports.simpleTopToBottom = exports.simpleRightToLeft = exports.simpleLeftToRight = exports.simpleFadeOut = exports.simpleFadeIn = void 0;
const math_1 = require("./math");
function pipePercentage({ thePercentage, thePage, }, ratio = 1.5) {
    if (thePage.colspan === 1) {
        return 1;
    }
    const endPercentage = (thePage.colspan - 1) / thePage.colspan;
    return math_1.clamp((thePercentage / endPercentage) * ratio, 0, 1);
}
exports.simpleFadeIn = {
    desc: "简单淡入",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            opacity: pipePercentage(options),
        };
    },
};
exports.simpleFadeOut = {
    desc: "简单淡出",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            opacity: 1 - pipePercentage(options),
        };
    },
};
exports.simpleLeftToRight = {
    desc: " > > > ",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            left: `${pipePercentage(options, 1) * 100}%`,
            top: "50%",
            right: "unset",
            bottom: "unset",
            transform: "translate(0,-50%)",
        };
    },
};
exports.simpleRightToLeft = {
    desc: " < < < ",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            right: `${pipePercentage(options, 1) * 100}%`,
            top: "50%",
            left: "unset",
            bottom: "unset",
            transform: "translate(0,-50%)",
        };
    },
};
exports.simpleTopToBottom = {
    desc: " V V V ",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            top: `${pipePercentage(options, 1) * 100}%`,
            left: "50%",
            right: "unset",
            bottom: "unset",
            transform: "translate(-50%,0)",
        };
    },
};
exports.simpleBottomToTop = {
    desc: " ^ ^ ^ ",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            bottom: `${pipePercentage(options, 1) * 100}%`,
            left: "50%",
            right: "unset",
            top: "unset",
            transform: "translate(-50%,0)",
        };
    },
};
exports.simpleZoomIn = {
    desc: "放大",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            transform: `translate(-50%,-50%)  scale(${pipePercentage(options)})`,
        };
    },
};
exports.simpleZoomOut = {
    desc: "缩小",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            transform: `translate(-50%,-50%)  scale(${1 - pipePercentage(options)})`,
        };
    },
};
exports.simpleRotate = {
    desc: "旋转",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            transform: `translate(-50%,-50%)  rotate(${pipePercentage(options) * 360}deg)`,
        };
    },
};
exports.simpleFlipX = {
    desc: "X 轴翻转",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            transform: `translate(-50%,-50%)  perspective(400px)  rotate3d(1, 0, 0, ${pipePercentage(options) * 360}deg)`,
        };
    },
};
exports.simpleFlipY = {
    desc: "Y 轴翻转",
    func(options) {
        if (options.thePage.colspan <= 1) {
            return {};
        }
        return {
            transform: `translate(-50%,-50%)  perspective(400px)  rotate3d(0, 1, 0, ${pipePercentage(options) * 360}deg)`,
        };
    },
};
//# sourceMappingURL=gene-style.js.map