import Canvas, { registerElement, useCtx } from '../canvas.js'
import { getStyle } from '../utils.js'

class Button {
  static defaultProps = {
    style: {
      border: '1px solid black',
      fontFamily: 'sans-serif',
      fontSize: '16',
      color: 'black',
      textAlign: 'left'
    }
  }

  constructor (props = {}, children = null) {
    this.children = children
    this.props = props

    this.pos = {
      startX: 0,
      startY: 0,
      endX: 0,
      endY: 0
    }

    registerElement(this)
  }

  render () {
    const ctx = useCtx()
    const fontSize = Number.parseInt(getStyle(this, 'fontSize')) * 2

    ctx.fillStyle = getStyle(this, 'color')
    ctx.font = fontSize + 'px ' + getStyle(this, 'fontFamily')
    ctx.textAlign = getStyle(this, 'textAlign')
    ctx.textBaseline = 'top'

    const border = getStyle(this, 'border').split(' ')
    const borderColor = border[2]
    const borderWidth = Number.parseInt(border[0]) * Canvas.ratio
    const padding = Number.parseInt(getStyle(this, 'padding')) * Canvas.ratio

    const measurements = {
      width: 0,
      height: 0,
      x: 0,
      y: 0,

      borderWidth: 0,
      borderHeight: 0,
      borderX: 0,
      borderY: 0,

      textWidth: 0,
      textHeight: 0,
      textX: 0,
      textY: 0
    }

    if (this.children) {
      const { width: textWidth } = ctx.measureText(this.children)

      measurements.width =
        measurements.borderWidth =
          measurements.textWidth =
            Math.ceil(textWidth)
      measurements.height =
        measurements.borderHeight =
          measurements.textHeight =
            fontSize
    }

    if (padding) {
      measurements.width += measurements.borderWidth += padding * 2
      measurements.height += measurements.borderHeight += padding * 2
      measurements.textX += padding
      measurements.textY += padding
    }

    if (borderWidth) {
      ctx.beginPath()

      ctx.rect(
        measurements.borderX,
        measurements.borderY,
        measurements.borderWidth,
        measurements.borderHeight
      )

      ctx.lineWidth = borderWidth
      ctx.strokeStyle = borderColor
      ctx.stroke()
    }

    this.pos.startX = measurements.x
    this.pos.startY = measurements.y
    this.pos.endX = measurements.x + measurements.width
    this.pos.endY = measurements.y + measurements.height

    if (this.children) {
      ctx.fillText(this.children, measurements.textX, measurements.textY)
    }
  }
}

export default Button
