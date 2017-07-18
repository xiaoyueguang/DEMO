import {width, height, random} from './helper'

const tween = 5000

function movePointer (origin, target) {
  
  function space (defaultValue) {
    let space = ~~(origin - target) / tween
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

export default class Pointer {
  constructor () {
    const {x, y} = this.init()
    this.x = x
    this.y = y

    this.setTarget()
    this.isMouse = false
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
    let org = this.x
    this.x = movePointer(this.x, this.targetX, mousePointer)
    this.y = movePointer(this.y, this.targetY, mousePointer)
  }

  // 设置目标点
  setTarget (x, y) {
    let pointer = this.init(true)
    if (arguments.length === 0) {
      x = pointer.x
      y = pointer.y
    }

    this.targetX = x
    this.targetY = y
  }

  destory () {
    for (let key in this) {
      delete this[key]
    }
  }


}