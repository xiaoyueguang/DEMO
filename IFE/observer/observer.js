class Observer {
  constructor (obj, isCreatedPri) {
    // 对象
    let _observer = isCreatedPri ? {} : {data: {}}
    let _data = isCreatedPri ? _observer : _observer.data
    // 私有变量
    let _obj = {}

    for (let key in obj) {
      _obj[key] = typeof obj[key] === 'object' ? new Observer(obj[key], true) : obj[key]


      Object.defineProperty(_data, key, {
        get () {
          console.log(`你访问了 ${key}: ${_obj[key]}`)
          return _obj[key]
        },

        set (val) {
          if (typeof val === 'object') {
            val = new Observer(val, true)
          } else {

          }
          console.log(`你设置了 ${key}, 新的值为 ${val}`)
          _obj[key] = val
          return val
        }
      })
    }
    return _observer
  }

}

let app1 = new Observer({
  name: 'Ray',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

app1.data.name
app1.data.age = 100
app2.data.university
app2.data.major = 'science'

// app1.data.name = {
//   lastName: 'lin',
//   firstName: 'jilei'
// }

let a = new Observer({
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
    f: {
      g: 5,
      h: {
        i: 6
      }
    }
  }
})
a.data.c.f.h.i