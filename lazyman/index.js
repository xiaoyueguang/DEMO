// 自动实例化, 返回实例化后的对象, 实现链式调用
function LazyMan (name) {
  return new _Lazyman(name)
}

//  原型链实现方式
function _lazyman (name) {
  var that = this
  // 创建一个任务队列
  this.queue = [function () {
    console.log('Hi! This is ' + name + '!')
    that.run()
  }]
  // 确保已经完成任务的调用
  setTimeout(function () {
    that.run()
  }, 10)
}
// eat, sleep, sleepFirst 都返回自身 实现链式调用
// 每次调用都将对应的方法放入队列
_lazyman.prototype.eat = function (food) {
  var that = this
  this.queue.push(function () {
    console.log('Eat ' + food + '~')
    that.run()
  })
  return this
}

_lazyman.prototype.sleep = function (time) {
  var that = this
  this.queue.push(function () {
    setTimeout(function () {
      console.log('Wake up after ' + time)
      that.run()
    }, time * 1000)
  })
  return this
}

_lazyman.prototype.sleepFirst = function (time) {
  var that = this
  this.queue.reverse().push(function () {
    setTimeout(function () {
      console.log('Wake up after ' + time)
      that.run()
    }, time * 1000)
  })
  this.queue.reverse()
  return this
}
// 判断是否为方法. 不是的话则终止运行
_lazyman.prototype.run = function () {
  var fn = this.queue.shift()
  typeof fn === 'function' && fn()
}

class _Lazyman {
  constructor (name) {
    this.queue = [() => {
      console.log('Hi! This is ' + name + '!')
      this.run()
    }]
    requestAnimationFrame(() => this.run())
  }

  eat (food) {
    this.queue.push(() => {
      console.log('Eat ' + food + '~')
      this.run()
    })
    return this
  }

  sleep (time) {
    this.queue.push(() => {
      setTimeout(() => {
        console.log('Wake up after ' + time)
        this.run()
      }, time * 1000)
    })
    return this
  }

  sleepFirst (time) {
    this.queue.reverse().push(() => {
      setTimeout(() => {
        console.log('Wake up after ' + time)
        this.run()
      }, time * 1000)
    })
    this.queue.reverse()
    return this
  }

  run () {
    let fn = this.queue.shift()
    typeof fn === 'function' && fn()
  }

}
