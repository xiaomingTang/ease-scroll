# ease-scroll

便捷地构建类似 [miui 官网](https://home.miui.com/) 的页面滚动动画

[live demo](https://xiaomingtang.github.io/ease-scroll/dist-examples/examples.html)

### install

``` cmd
$ yarn add xm-ease-scroll
```

### usage

``` typescript
import { EaseScroll, EasePageOptions, useSize } from "xm-ease-scroll"

const pages: EasePageOptions = [
  {
    colspan: 1,
    elem(options) {
      return <WhatEverYouWant />
    },
  }
]

export default function App() {
  const size = useSize()

  return <EaseScroll
    pageSize={size}
    pages={pages}
  />
}
```
