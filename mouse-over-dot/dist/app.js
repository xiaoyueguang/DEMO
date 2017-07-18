/* DEMO-LINJILEI */
'use strict';

/**
 * 生成一个随机数
 * @param {number} max 随机数上限
 * @param {number} min 随机数下限
 */
function random (max = 2, min = 1) {
  return Math.round(Math.random() * (max - min)) + (min)
}

// 获取屏幕宽高
let {width: bodyWidth, height: bodyHeight} = getComputedStyle(document.body);

let width = parseInt(bodyWidth, 10);
let height = parseInt(bodyHeight, 10);

const tween = 5000;

function movePointer (origin, target) {
  
  function space (defaultValue) {
    let space = ~~(origin - target) / tween;
    return space === 0 ? defaultValue : space
  }

  if (origin > target) {
    return origin + space(1)
  } else if (origin < target) {
    return origin + space(-1)
  } else {
    return origin
  }
}

class Pointer {
  constructor () {
    const {x, y} = this.init();
    this.x = x;
    this.y = y;

    this.setTarget();
    this.isMouse = false;
  }
  // 生成点
  init (isTarget) {
    return {
      x: random(width) + (isTarget ? (random(2) > 1 ? -width : width) : 0),
      y: random(height) + (isTarget ? (random(2) > 1 ? -height : height) : 0)
    }
  }

  // 移动
  move (mousePointer) {
    let org = this.x;
    this.x = movePointer(this.x, this.targetX, mousePointer);
    this.y = movePointer(this.y, this.targetY, mousePointer);
  }

  // 设置目标点
  setTarget (x, y) {
    let pointer = this.init(true);
    if (arguments.length === 0) {
      x = pointer.x;
      y = pointer.y;
    }

    this.targetX = x;
    this.targetY = y;
  }

  destory () {
    for (let key in this) {
      delete this[key];
    }
  }


}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = width;
canvas.height = height;

const pow2 = x => Math.pow(x, 2);

const nearPointer = (origin, target) => pow2(origin.x - target.x) + pow2(origin.y - target.y);
const mousePointer = new Pointer();

const isOut = ({x, y}) => (x > width || x < 0) || (y > height || y < 0);

const App = {
  pointers: [],

  addPointer () {
    this.pointers.push(new Pointer());
  },

  pointersRender () {
    this.pointers.forEach(pointer => {
      if (isOut(pointer)) {
        let index = this.pointers.indexOf(pointer);
        this.pointers.splice(index, 1);
        // pointer.destory()
        // pointer = null
        this.pointers.push(new Pointer());
      }
      if (nearPointer(mousePointer, pointer)) {
        pointer.move(mousePointer);
      } else [
        pointer.move()
      ];

      ctx.beginPath();
      ctx.arc(
        pointer.x,
        pointer.y,
        1,
        0,
        2 * Math.PI,
        true
      );
      ctx.fillStyle = pointer.isMouse ? 'rgba(0, 0, 0, 0)' : '#000';
      ctx.fill();
    });
  },

  linesRender () {
    this.pointers.forEach(pointer1 => {
      this.pointers.forEach(pointer2 => {
        const space = nearPointer(pointer1, pointer2);
        if (space < 5000) {
          ctx.beginPath();
          ctx.moveTo(pointer1.x, pointer1.y);
          ctx.lineTo(pointer2.x, pointer2.y);

          ctx.strokeStyle = `rgba(0, 0, 0, ${1 - (space / 5000)})`;
          ctx.stroke();
        }
      });
    });
  },



  render () {
    ctx.clearRect(0, 0, width, height);

    this.pointersRender();

    this.linesRender();

    requestAnimationFrame(this.render.bind(this));
  }
};

for (let i = 0; i < 100; i ++) {
  App.addPointer();
}

App.render();


mousePointer.isMouse = true;

canvas.addEventListener('mouseenter', function () {
  App.pointers.push(mousePointer);
});

canvas.addEventListener('mousemove', function ({clientX, clientY}) {
  mousePointer.x = mousePointer.targetX = clientX;
  mousePointer.y = mousePointer.targetY = clientY;
});

canvas.addEventListener('mouseleave', function () {
  App.pointers.splice(App.pointers.indexOf(mousePointer));
});
