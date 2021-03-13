import { hot } from "react-hot-loader/root"
import React from "react"

import "@Src/examples/global/global"

import { EaseElemOptions, EaseScroll } from "@Src/main/index"
import { Size, useSize } from "@Src/utils/use-size"
import { EaseFixedFullStepElem } from "@Src/components/EaseElem"
import { randomInt, randomPick } from "@Src/utils/math"
import {
  simpleFadeIn, simpleFadeOut, simpleLeftToRight, simpleRightToLeft, simpleTopToBottom, simpleBottomToTop, simpleZoomIn, simpleZoomOut, simpleRotate, simpleFlipX, simpleFlipY,
} from "@Src/utils/gene-style"
import F1 from "@Src/assets/f-1.jpg"

import Styles from "./App.module.less"

const animations = [
  simpleFadeIn, simpleFadeOut, simpleLeftToRight, simpleRightToLeft, simpleTopToBottom, simpleBottomToTop, simpleZoomIn, simpleZoomOut, simpleRotate, simpleFlipX, simpleFlipY,
]

const genePages = (size: Size) => animations.map((_, idx) => {
  const fromColor = `hsla(${randomInt(0, 180)}, ${randomInt(20, 50)}%, ${randomInt(50, 80)}%, 1)`
  const toColor = `hsla(${randomInt(180, 360)}, ${randomInt(20, 50)}%, ${randomInt(50, 80)}%, 1)`
  return {
    bg: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
    geneStyle: animations[idx % animations.length],
  }
}).map(({ bg, geneStyle }) => ({
  colspan: randomPick(2, 4),
  elem(options: EaseElemOptions) {
    return (<EaseFixedFullStepElem size={size} style={{ background: bg }}>
      <img src={F1} alt="" className={Styles.fg} style={geneStyle.func(options)} />
      <div className={Styles.t}>
        <div>第 {options.thePageIndex} 页, 该页有 {options.thePage.colspan} step</div>
        <div>已滚动至第 {options.curPageIndex} 页; 本页已滚动: {Math.round(options.thePercentage * 100)}%</div>
        <div>示例图片的动画为 {geneStyle.desc}</div>
        <div>(step 决定了动画完成时的滚动距离)</div>
      </div>
    </EaseFixedFullStepElem>)
  },
}))

function App() {
  const size = useSize()
  return <EaseScroll pageSize={size} pages={[
    ...genePages(size),
    {
      colspan: 0,
      alwaysRender: true,
      elem(options: EaseElemOptions) {
        return options.curPageIndex >= 1 && <div className={Styles.backTop} onClick={() => options.scrollTo(0)}>
          返回顶部
        </div>
      },
    },
  ]} />
}

export default hot(App)
