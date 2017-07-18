import {width, height, random} from './helper'

const tween:number = 5000
/**
 * 点
 */
interface Pointer {
  constructor();
  /**
   * 点的 X 轴
   */
  x: number;
  /**
   * 点的 Y 轴
   */
  y: number;
  /**
   * 点的目标 X 轴
   */
  targetX: number;
  /**
   * 点的目标 Y 轴
   */
  targetY: number;
  /**
   * 该点是否为鼠标下的点
   */
  isMouse: boolean;
  /**
   * 生成一个随机点坐标
   */
  init(isTarget?: boolean): {x: number, y: number};
  /**
   * 移动点
   */
  move(pointer?: Pointer): void;
  /**
   * 设置目标点
   */
  setTarget(x?: number, y?: number): void;
}
/**
 * 移动点
 * @param origin 原来的点
 * @param target 目标点
 * @param mousePointer 鼠标的坐标
 */
function movePointer (origin: number, target: number, mousePointer?: Pointer): number {

  function space (defaultValue: number): number {
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

 class Pointer {
  constructor () {
    const {x, y} = this.init()
    this.x = x
    this.y = y

    this.setTarget()
    this.isMouse = false
  }

  init (isTarget) {
    return {
      x: random(width) + (isTarget ? (random(2) > 1 ? -width : width) : 0),
      y: random(height) + (isTarget ? (random(2) > 1 ? -height : height) : 0)
    }
  }

  move (mousePointer) {
    let org = this.x
    this.x = movePointer(this.x, this.targetX, mousePointer)
    this.y = movePointer(this.y, this.targetY, mousePointer)
  }

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

export default Pointer
