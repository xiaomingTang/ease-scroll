import { EaseElemOptions } from "@Src/main"
import { conditions } from "./logic"
import { clamp } from "./math"

export interface GeneStyleFunc {
  (options: EaseElemOptions): React.CSSProperties;
}

interface GeneStyleFuncMap {
  desc: string;
  func: GeneStyleFunc;
}

function pipePercentage({
  thePercentage, thePage,
}: EaseElemOptions, ratio = 1.5) {
  if (thePage.colspan === 1) {
    return 1
  }
  const endPercentage = (thePage.colspan - 1) / thePage.colspan
  return clamp((thePercentage / endPercentage) * ratio, 0, 1)
}

export const simpleFadeIn: GeneStyleFuncMap = {
  desc: "简单淡入",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      opacity: pipePercentage(options),
    }
  },
}

export const simpleFadeOut: GeneStyleFuncMap = {
  desc: "简单淡出",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      opacity: 1 - pipePercentage(options),
    }
  },
}

export const simpleLeftToRight: GeneStyleFuncMap = {
  desc: " > > > ",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      left: `${pipePercentage(options, 1) * 100}%`,
      top: "50%",
      right: "unset",
      bottom: "unset",
      transform: "translate(0,-50%)",
    }
  },
}

export const simpleRightToLeft: GeneStyleFuncMap = {
  desc: " < < < ",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      right: `${pipePercentage(options, 1) * 100}%`,
      top: "50%",
      left: "unset",
      bottom: "unset",
      transform: "translate(0,-50%)",
    }
  },
}

export const simpleTopToBottom: GeneStyleFuncMap = {
  desc: " V V V ",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      top: `${pipePercentage(options, 1) * 100}%`,
      left: "50%",
      right: "unset",
      bottom: "unset",
      transform: "translate(-50%,0)",
    }
  },
}

export const simpleBottomToTop: GeneStyleFuncMap = {
  desc: " ^ ^ ^ ",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      bottom: `${pipePercentage(options, 1) * 100}%`,
      left: "50%",
      right: "unset",
      top: "unset",
      transform: "translate(-50%,0)",
    }
  },
}

export const simpleZoomIn: GeneStyleFuncMap = {
  desc: "放大",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      transform: `translate(-50%,-50%)  scale(${pipePercentage(options)})`,
    }
  },
}

export const simpleZoomOut: GeneStyleFuncMap = {
  desc: "缩小",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      transform: `translate(-50%,-50%)  scale(${1 - pipePercentage(options)})`,
    }
  },
}

export const simpleRotate: GeneStyleFuncMap = {
  desc: "旋转",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      transform: `translate(-50%,-50%)  rotate(${pipePercentage(options) * 360}deg)`,
    }
  },
}

export const simpleFlipX: GeneStyleFuncMap = {
  desc: "X 轴翻转",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      transform: `translate(-50%,-50%)  perspective(400px)  rotate3d(1, 0, 0, ${pipePercentage(options) * 360}deg)`,
    }
  },
}

export const simpleFlipY: GeneStyleFuncMap = {
  desc: "Y 轴翻转",
  func(options) {
    if (options.thePage.colspan <= 1) { return {} }
    return {
      transform: `translate(-50%,-50%)  perspective(400px)  rotate3d(0, 1, 0, ${pipePercentage(options) * 360}deg)`,
    }
  },
}
