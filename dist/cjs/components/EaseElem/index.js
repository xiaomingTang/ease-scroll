"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EaseFixedFullStepElem = exports.EaseFullStepElem = void 0;
const react_1 = __importDefault(require("react"));
function EaseFullStepElem({ size, style, children, ...props }) {
    return react_1.default.createElement("div", Object.assign({ style: {
            maxWidth: "100%",
            width: `${size.width}px`,
            height: `${size.height}px`,
            ...style,
        } }, props), children);
}
exports.EaseFullStepElem = EaseFullStepElem;
function EaseFixedFullStepElem({ size, style, children, ...props }) {
    return react_1.default.createElement(EaseFullStepElem, Object.assign({ size: size, style: {
            position: "sticky",
            top: 0,
            ...style,
        } }, props), children);
}
exports.EaseFixedFullStepElem = EaseFixedFullStepElem;
//# sourceMappingURL=index.js.map