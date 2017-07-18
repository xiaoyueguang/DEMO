
let canvas: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById('canvas')

const ctx: CanvasRenderingContext2D = canvas.getContext('2d')

import {width, height, random} from './helper'

import Pointer from './pointer'

canvas.width = width
canvas.height = height

const pow2 = x => Math.pow(x, 2)

const nearPointer = (origin, target) => pow2(origin.x - target.x) + pow2(origin.y - target.y)
const mousePointer = new Pointer()

const isOut = ({x, y}) => (x > width || x < 0) || (y > height || y < 0)

/**
 * 主要APP
 */
interface App {
  /**
   * 点的集合
   */
  pointers: Pointer[],
  /**
   * 添加点
   */
  addPointer(): void,
  /**
   * 重绘点
   */
  pointersRender(): void,
  /**
   * 重绘线
   */
  linesRender(): void,
  /**
   * 刷新页面
   */
  render(): void
}

class App {
  constructor () {
    this.pointers = []
  }

  addPointer () {
    this.pointers.push(new Pointer())
  }

  pointersRender () {
    this.pointers.forEach(pointer => {
      if (isOut(pointer)) {
        let index = this.pointers.indexOf(pointer)
        this.pointers.splice(index, 1)
        // pointer.destory()
        // pointer = null
        this.pointers.push(new Pointer())
      }
      if (nearPointer(mousePointer, pointer)) {
        pointer.move(mousePointer)
      } else [
        pointer.move()
      ]

      ctx.beginPath()
      ctx.arc(
        pointer.x,
        pointer.y,
        1,
        0,
        2 * Math.PI,
        true
      )
      ctx.fillStyle = pointer.isMouse ? 'rgba(0, 0, 0, 0)' : '#000'
      ctx.fill()
    })
  }

  linesRender () {
    this.pointers.forEach(pointer1 => {
      this.pointers.forEach(pointer2 => {
        const space = nearPointer(pointer1, pointer2)
        if (space < 5000) {
          ctx.beginPath()
          ctx.moveTo(pointer1.x, pointer1.y)
          ctx.lineTo(pointer2.x, pointer2.y)

          ctx.strokeStyle = `rgba(0, 0, 0, ${1 - (space / 5000)})`
          ctx.stroke()
        }
      })
    })
  }

  render () {
    ctx.clearRect(0, 0, width, height)

    this.pointersRender()

    this.linesRender()

    requestAnimationFrame(this.render.bind(this))
  }
}

const app = new App()

for (let i = 0; i < 100; i ++) {
  app.addPointer()
}

app.render()


mousePointer.isMouse = true

canvas.addEventListener('mouseenter', function () {
  app.pointers.push(mousePointer)
})

canvas.addEventListener('mousemove', function ({clientX, clientY}) {
  mousePointer.x = mousePointer.targetX = clientX
  mousePointer.y = mousePointer.targetY = clientY
})

canvas.addEventListener('mouseleave', function () {
  app.pointers.splice(app.pointers.indexOf(mousePointer))
})
