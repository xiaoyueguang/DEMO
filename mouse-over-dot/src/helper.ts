/**
 * 生成一个随机数
 * @param {number} max 随机数上限
 * @param {number} min 随机数下限
 */
export function random (max: number = 2, min: number = 1) : number {
  return Math.round(Math.random() * (max - min)) + (min)
}

// 获取屏幕宽高
let {width: bodyWidth, height: bodyHeight} = getComputedStyle(document.body);

export let width: number = parseInt(bodyWidth, 10)
export let height: number = parseInt(bodyHeight, 10)
