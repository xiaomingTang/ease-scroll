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
  elem({
    thePercentage, page, pageIndex, prevStep,
  }: EaseElemOptions) {
    return (<EaseFixedFullStepElem size={size} style={{ background: bg }}>
      <img src={F1} alt="" className={Styles.fg} style={geneStyle.func({
        thePercentage, page, pageIndex, prevStep,
      })} />
      <div className={Styles.t}>
        <div>第 {pageIndex} 页, 该页有 {page.colspan} step</div>
        <div>该页已滚动: {Math.round(thePercentage * 100)}%</div>
        <div>示例图片的动画为 {geneStyle.desc}</div>
        <div>该页之前存在 {prevStep} step</div>
        <div>step 决定了动画完成时的滚动距离</div>
      </div>
    </EaseFixedFullStepElem>)
  },
}))

function App() {
  const size = useSize()
  return <EaseScroll pageSize={size} pages={genePages(size)} />
}

export default hot(App)
