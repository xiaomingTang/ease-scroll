import { HTMLAttributes } from "react";
import { Size } from "@Src/utils/use-size";
interface EaseFullStepElemProps extends HTMLAttributes<HTMLDivElement> {
    size: Size;
}
export declare function EaseFullStepElem({ size, style, children, ...props }: EaseFullStepElemProps): JSX.Element;
export declare function EaseFixedFullStepElem({ size, style, children, ...props }: EaseFullStepElemProps): JSX.Element;
export {};
