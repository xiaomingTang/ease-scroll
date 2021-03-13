import React, { HTMLAttributes } from "react"
import { Size } from "@Src/utils/use-size"

interface EaseFullStepElemProps extends HTMLAttributes<HTMLDivElement> {
  size: Size;
}

export function EaseFullStepElem({
  size,
  style,
  children,
  ...props
}: EaseFullStepElemProps) {
  return <div style={{
    maxWidth: "100%",
    width: `${size.width}px`,
    height: `${size.height}px`,
    ...style,
  }} {...props}>
    {children}
  </div>
}

export function EaseFixedFullStepElem({
  size,
  style,
  children,
  ...props
}: EaseFullStepElemProps) {
  return <EaseFullStepElem size={size} style={{
    position: "sticky",
    top: 0,
    ...style,
  }} {...props}>
    {children}
  </EaseFullStepElem>
}
