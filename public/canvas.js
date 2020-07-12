import { getProp } from './utils.js'

class Canvas {
  static ratio = 2

  constructor () {
    this.canvas = document.createElement('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.elements = []

    const width = window.innerWidth
    const height = window.innerHeight

    this.canvas.width = width * Canvas.ratio
    this.canvas.height = height * Canvas.ratio
    this.canvas.style.display = 'block'
    this.canvas.style.width = width + 'px'
    this.canvas.style.height = height + 'px'

    document.body.style.margin = '0'
    document.body.insertBefore(this.canvas, document.body.children[0])

    this.canvas.addEventListener('click', (e) => {
      const posX = e.clientX * Canvas.ratio
      const posY = e.clientY * Canvas.ratio

      for (let i = this.elements.length - 1; i >= 0; i--) {
        const element = this.elements[i]

        if (
          element.pos.startX <= posX &&
          element.pos.startY <= posY &&
          element.pos.endX >= posX &&
          element.pos.endY >= posY
        ) {
          const clickHandler = getProp(element, 'onClick')

          if (clickHandler) {
            clickHandler(e)
          }

          break
        }
      }
    })
  }
}

const canvas = new Canvas()

export const registerElement = (element) => {
  element.render()
  return canvas.elements.push(element)
}

export const useCtx = () => {
  return canvas.ctx
}

export default Canvas
