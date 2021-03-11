/// <reference types="react" />
import { EaseElemOptions } from "@Src/main";
export interface GeneStyleFunc {
    (options: EaseElemOptions): React.CSSProperties;
}
interface GeneStyleFuncMap {
    desc: string;
    func: GeneStyleFunc;
}
export declare const simpleFadeIn: GeneStyleFuncMap;
export declare const simpleFadeOut: GeneStyleFuncMap;
export declare const simpleLeftToRight: GeneStyleFuncMap;
export declare const simpleRightToLeft: GeneStyleFuncMap;
export declare const simpleTopToBottom: GeneStyleFuncMap;
export declare const simpleBottomToTop: GeneStyleFuncMap;
export declare const simpleZoomIn: GeneStyleFuncMap;
export declare const simpleZoomOut: GeneStyleFuncMap;
export declare const simpleRotate: GeneStyleFuncMap;
export declare const simpleFlipX: GeneStyleFuncMap;
export declare const simpleFlipY: GeneStyleFuncMap;
export {};
