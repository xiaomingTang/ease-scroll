export interface Size {
    width: number;
    height: number;
}
declare type SizeType = "BODY_AVAIL_SIZE" | "BODY_SCROLL_SIZE" | "WINDOW_AVAIL_SIZE";
export declare function useSize(type?: SizeType): Size;
declare type Orientation = "PORTRAIT" | "LANDSCAPE";
export declare function useOrientation(): Orientation;
export {};
