class Observer {
  constructor (obj, isCreatedPri) {
    // 对象
    let _observer = isCreatedPri ? {} : {data: {}}
    let _data = isCreatedPri ? _observer : _observer.data
    // 私有变量
    let _obj = {}
    // 私有watch
    let _watch = new Watch()
    for (let key in obj) {
      _obj[key] = typeof obj[key] === 'object' ? new Observer(obj[key], true) : obj[key]


      Object.defineProperty(_data, key, {
        get () {
          console.log(`你访问了 ${key}: `,_obj[key])
          return _obj[key]
        },

        set (val) {
          if (typeof val === 'object') {
            val = new Observer(val, true)
          }
          console.log(`你设置了 ${key}, 新的值为:`, val)
          _obj[key] = val
          _watch.trigger(key)
          return val
        }
      })
    }
    _observer.$watch = (key, callback) => {
      _watch.on(key, () => {callback(_obj[key])})
    }
    return _observer
  }
}
// watch 构造函数. 包含监听的回调
class Watch {
  constructor () {
    // 监听的任务.
    this.task = {
    };
  }
  // 监听
  on (key, callback) {
    // 没有则创建
    this.task[key] ? this.task[key].push(callback) : this.task[key] = [callback]
  }
  // 触发
  trigger (key) {
    // 判断是否有对象, 且为数组
    if (Array.isArray(this.task[key])) {
      this.task[key].forEach(fn => fn())
    }
  }

}

// let app1 = new Observer({
//   name: 'Ray',
//   age: 25
// });

// let app2 = new Observer({
//   university: 'bupt',
//   major: 'computer'
// });

// app1.data.name
// app1.data.age = 100
// app2.data.university
// app2.data.major = 'science'

// app1.data.name = {
//   lastName: 'lin',
//   firstName: 'jilei'
// }

// let a = new Observer({
//   a: 1,
//   b: 2,
//   c: {
//     d: 3,
//     e: 4,
//     f: {
//       g: 5,
//       h: {
//         i: 6
//       }
//     }
//   }
// })