import React, { useCallback, useMemo, useState } from "react"

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

export function EaseScroll({
  alwaysRender = false,
  pageSize: {
    width: pageWidth,
    height: pageHeight,
  },
  pages,
}: EaseScrollOptions) {
  const [curPageIndex, setCurPageIndex] = useState(0)
  const [percentages, setPercentages] = useState([0, 1] as [number, number])
  const steps = useMemo(() => pages.map((page, pageIndex) => pages.reduce((prev, cur, idx) => {
    if (idx < pageIndex) {
      return prev + cur.colspan
    }
    return prev
  }, 0)), [pages])

  const onScroll = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const {
      scrollTop = 0,
    } = e.target as HTMLDivElement

    let thePageIndex = 0
    let curStep = 0
    const totalStep = Math.floor(scrollTop / pageHeight)

    for (let i = 0, len = pages.length; i < len; i += 1) {
      const nextStep = curStep + pages[i].colspan
      if (totalStep >= curStep && totalStep < nextStep) {
        thePageIndex = i
        break
      }
      curStep = nextStep
    }

    const thePage = pages[thePageIndex]
    const nextPage = pages[thePageIndex + 1]

    const thePercentage = (scrollTop - curStep * pageHeight) / ((thePage?.colspan || 1) * pageHeight)
    const nextPercentage = (scrollTop - (curStep + (thePage?.colspan || 1)) * pageHeight) / ((nextPage?.colspan || 1) * pageHeight)
    setCurPageIndex(thePageIndex)
    setPercentages([thePercentage, nextPercentage])
  }, [pageHeight, pages])

  return <div onScroll={onScroll} style={{
    width: `${pageWidth}px`,
    height: `${pageHeight}px`,
    overflowX: "hidden",
    overflowY: "auto",
  }}>
    {
      pages.map((page, pageIndex) => (<div key={pageIndex} style={{
        position: "relative",
        overflow: "visible",
        width: `${pageWidth}px`,
        height: `${pageHeight * page.colspan}px`,
      }}>
        {
          (() => {
            // 渲染当前页
            if (pageIndex === curPageIndex) {
              return page.elem({
                thePercentage: percentages[0],
                page,
                pageIndex,
                prevStep: steps[pageIndex],
              })
            }
            if (
              // 始终渲染
              alwaysRender
              // 渲染下一页(这个是有必要的, 因为当前页将要结束时, 下一页已经出现在视野中了, 所以必须渲染)
              || pageIndex === curPageIndex + 1
              // 渲染上一页(这一页始终不会出现在视野中, 可以不渲染, 但是还是保留着吧, 快速滚动时降低白屏的几率)
              || pageIndex === curPageIndex - 1
            ) {
              return page.elem({
                thePercentage: percentages[1],
                page,
                pageIndex,
                prevStep: steps[pageIndex],
              })
            }
            return <></>
          })()
        }
      </div>))
    }
  </div>
}
