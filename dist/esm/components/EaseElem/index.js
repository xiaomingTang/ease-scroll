import React from "react";
export function EaseFullStepElem({ size, style, children, ...props }) {
    return React.createElement("div", Object.assign({ style: {
            width: `${size.width}px`,
            height: `${size.height}px`,
            ...style,
        } }, props), children);
}
export function EaseFixedFullStepElem({ size, style, children, ...props }) {
    return React.createElement(EaseFullStepElem, Object.assign({ size: size, style: {
            position: "sticky",
            top: 0,
            ...style,
        } }, props), children);
}
//# sourceMappingURL=index.js.map