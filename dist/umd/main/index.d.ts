import { HTMLAttributes } from "react";
export interface EaseElemOptions {
    /**
     * 本页
     */
    thePage: EasePageOptions;
    /**
     * 本页序号
     */
    thePageIndex: number;
    /**
     * 本页已滚动比率
     *
     * 当 本页 顶部与容器顶部平齐时, thePercentage === 0
     *
     * 当 本页 底部与容器顶部平齐时, thePercentage === 1
     */
    thePercentage: number;
    /**
     * 当前所处页
     */
    curPage: EasePageOptions;
    /**
     * 当前所处页序号
     */
    curPageIndex: number;
    /**
     * @param {number} tarPageIndex 滚动至目标页, 必须为正整数
     * @param {number} tarStepIndex 滚动至目标页内的 step, 可以为小数或负数, 也可以超过 tarPage.colspan(将会相对 tarPage 进行偏移, 偏移值为 tarStepIndex)
     * @param {ScrollBehavior} behavior 滚动行为
     */
    scrollTo: (tarPageIndex: number, tarStepIndex?: number, behavior?: ScrollBehavior) => void;
}
export interface EasePageOptions {
    /**
     * colspan * pageSize.height 即为本页的高度
     * 可以为 0 或 小数, 不得为负数, 比方说放一些 position: fixed 的元素
     */
    colspan: number;
    elem: (elemOpions: EaseElemOptions) => JSX.Element | undefined | null | false;
    alwaysRender?: boolean;
    /**
     * 直接添加到 Page 容器上
     *
     * 如果你修改了 style.position 或 style.height 或其他影响该 page 高度的属性
     *
     * 则会影响到后续的 Page 的滚动相关的计算, 因此强烈不建议配置
     *
     * 如果必须要配置, 则一定要谨慎
     *
     * 当你确信不会影响到 page 容器的高度, 或者后面的 page 容器不需要计算滚动了, 才可以配置
     */
    pageProps?: HTMLAttributes<HTMLDivElement>;
}
export interface EaseScrollOptions {
    pageSize: {
        width: number;
        height: number;
    };
    pages: EasePageOptions[];
    alwaysRender?: boolean;
}
export declare function EaseScroll({ alwaysRender, pageSize: { width: pageWidth, height: pageHeight, }, pages, }: EaseScrollOptions): JSX.Element;
