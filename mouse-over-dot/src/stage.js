const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

import {width, height, random} from './helper'

import Pointer from './pointer'

canvas.width = width
canvas.height = height

const pow2 = x => Math.pow(x, 2)

const nearPointer = (origin, target) => pow2(origin.x - target.x) + pow2(origin.y - target.y)
const mousePointer = new Pointer()

const isOut = ({x, y}) => (x > width || x < 0) || (y > height || y < 0)

const App = {
  pointers: [],

  addPointer () {
    this.pointers.push(new Pointer())
  },

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
  },

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
  },



  render () {
    ctx.clearRect(0, 0, width, height)

    this.pointersRender()

    this.linesRender()

    requestAnimationFrame(this.render.bind(this))
  }
}

for (let i = 0; i < 100; i ++) {
  App.addPointer()
}

App.render()


mousePointer.isMouse = true

canvas.addEventListener('mouseenter', function () {
  App.pointers.push(mousePointer)
})

canvas.addEventListener('mousemove', function ({clientX, clientY}) {
  mousePointer.x = mousePointer.targetX = clientX
  mousePointer.y = mousePointer.targetY = clientY
})

canvas.addEventListener('mouseleave', function () {
  App.pointers.splice(App.pointers.indexOf(mousePointer))
})
