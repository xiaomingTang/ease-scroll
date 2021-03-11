/// <reference types="react" />
export interface EaseElemOptions {
    /**
     * 当前页已滚动比率
     *
     * 当 当前页 顶部与容器顶部平齐时, thePercentage === 0
     *
     * 当 当前页 底部与容器顶部平齐时, thePercentage === 1
     */
    thePercentage: number;
    /**
     * 当前页
     */
    page: EasePageOptions;
    /**
     * 当前页序号
     */
    pageIndex: number;
    /**
     * 当前页顶部之前的 step 总数
     *
     * step: 抽象高度(height)单位, pageSize.height 即为一个 step
     */
    prevStep: number;
}
export interface EasePageOptions {
    /**
     * colspan * pageSize.height 即为当前页的高度
     */
    colspan: number;
    elem: (elemOpions: EaseElemOptions) => JSX.Element;
}
export interface EaseScrollOptions {
    alwaysRender?: boolean;
    pageSize: {
        width: number;
        height: number;
    };
    pages: EasePageOptions[];
}
export declare function EaseScroll({ alwaysRender, pageSize: { width: pageWidth, height: pageHeight, }, pages, }: EaseScrollOptions): JSX.Element;
