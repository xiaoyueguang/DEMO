// file:///Users/ray/Documents/project/DEMO/canvas/index.html
// 画布
function render () {


const $canvas = document.getElementById('canvas')
// 获取屏幕宽高
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
    this.r = random(r, 1)

    this.targetInit()
  }

  // 生成目标点
  targetInit () {
    this.targetX = random(width)
    this.targetY = random(height)
  }

  move (pointer, targetPointer) {
    let outDo = targetPointer > pointer
    let tween = random(300, 400)
    return outDo ?
      pointer + Math.abs(targetPointer - pointer) / tween :
      pointer - Math.abs(targetPointer - pointer) / tween
  }

  run () {
    // this.x = randomCalc(this.x, random())
    // this.y = randomCalc(this.y, random())
    this.x = this.move(this.x, this.targetX)
    this.y = this.move(this.y, this.targetY)
  }
}
// 画布
const canvas = {
  isCreated: false,
  pointerLimit: 10,
  pointerWidth: 15,
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
  // 生成 点
  pointerInit () {
    let pointer = new Pointer(width, height, this.pointerWidth)
    this.pointer.push(pointer)
    this.pointerRender(pointer)
  },
  // 画点
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
  // 点跑起来
  pointerRun () {
    this.pointer.forEach((pointer) => {
      pointer.run()
      this.pointerRender(pointer)
    })
  },
  // 画线
  lineRun () {
    let pointer = this.pointer
    let length = pointer.length
    let ctx = this.ctx
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        if (i !== j) {
          ctx.beginPath()
          ctx.moveTo(pointer[i].x, pointer[i].y)
          ctx.lineTo(pointer[j].x, pointer[j].y)
          ctx.stroke()
        }
      }
    }
  },
  // 画
  render: function render () {
    this.created()
    this.ctx.clearRect(0, 0, width, height)
    this.ctx.fillStyle = '#f3f3f3'
    this.ctx.strokeStyle = '#f3f3f3'
    this.pointerRun()
    this.lineRun()

    requestAnimationFrame(render.bind(this))
  }
}


canvas.render();

setInterval(() => {
  canvas.pointer.forEach(pointer => {
    pointer.targetInit()
  })
}, 10000)

}

render()