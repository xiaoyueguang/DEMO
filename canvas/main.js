const $canvas = document.getElementById('canvas')

let {width, height} = getComputedStyle(document.body);

width = parseInt(width, 10)
height = parseInt(height, 10)

$canvas.width = width;
$canvas.height = height;

function random (max = 2, min = 1) {
  return Math.floor(Math.random() * max) + (min)
}

function randomCalc (num1, num2) {
  return Math.random() > 0.5 ? num1 + num2 : num1 - num2
}

// 生成点
class Pointer {
  constructor (width, height, r) {
    this.x = random(width)
    this.y = random(height)
    // 最小为 10
    this.r = random(r, 10)
  }

  run () {
    this.x = randomCalc(this.x, random())
    this.y = randomCalc(this.y, random())
  }
}


const canvas = {
  isCreated: false,
  pointerLimit: 1,
  pointerWidth: 1,
  pointer: [],
  ctx: null,
  el: null,

  created () {
    if (this.isCreated) return

    this.isCreated = true
    this.el = $canvas;
    this.ctx = this.el.getContext('2d')

    // 画点
    for (let i = 0; i < this.pointerLimit; i++) {
      this.pointerInit()
    }
  },

  pointerInit () {
    let pointer = new Pointer(width, height, this.pointerWidth)
    this.pointer.push(pointer)
    this.pointerRender(pointer)
  },

  pointerRender (pointer) {
    this.ctx.beginPath()
    this.ctx.arc(
      pointer.x,
      pointer.y,
      pointer.r,
      0,
      2 * Math.PI,
      true
    )
    this.ctx.fill()
  },

  pointerRun () {
    this.pointer.forEach((pointer) => {
      pointer.run()
      this.pointerRender(pointer)
    })
  },

  render: function render () {
    this.created()
    this.ctx.clearRect(0, 0, width, height)
    this.pointerRun()
    requestAnimationFrame(render.bind(this))
  }
}


canvas.render();
