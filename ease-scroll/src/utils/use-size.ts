import { useState, useEffect } from "react"

export interface Size {
  width: number;
  height: number;
}

function getBodyAvailSize(): Size {
  return {
    width: document.body.clientWidth,
    height: document.body.clientHeight,
  }
}

function getBodyScrollSize(): Size {
  return {
    width: document.body.scrollWidth,
    height: document.body.scrollHeight,
  }
}

function getWindowAvailSize(): Size {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

type SizeType = "BODY_AVAIL_SIZE" | "BODY_SCROLL_SIZE" | "WINDOW_AVAIL_SIZE"

const getSizeMap: {
  [key in SizeType]: () => Size;
} = {
  BODY_AVAIL_SIZE: getBodyAvailSize,
  BODY_SCROLL_SIZE: getBodyScrollSize,
  WINDOW_AVAIL_SIZE: getWindowAvailSize,
}

export function useSize(type: SizeType = "WINDOW_AVAIL_SIZE"): Size {
  const [state, setState] = useState<Size>({
    width: 1,
    height: 1,
  })

  useEffect(() => {
    const resizeHandler = () => {
      const getSizeFunc = getSizeMap[type]
      if (getSizeFunc) {
        setState(getSizeFunc)
      } else {
        console.error(`useSize parameter error: type expected SizeType, got ${type}`)
      }
    }

    resizeHandler()

    window.addEventListener("resize", resizeHandler)
    // 微信内置浏览器环境下, 屏幕旋转不会触发 resize 事件, 所以额外新增一个 orientationchange 监听
    window.addEventListener("orientationchange", resizeHandler)

    return () => {
      window.removeEventListener("resize", resizeHandler)
      window.removeEventListener("orientationchange", resizeHandler)
    }
  }, [type])

  return state
}

type Orientation = "PORTRAIT" | "LANDSCAPE"

export function useOrientation(): Orientation {
  const docSize = useSize("WINDOW_AVAIL_SIZE")
  return docSize.width > docSize.height ? "LANDSCAPE" : "PORTRAIT"
}
