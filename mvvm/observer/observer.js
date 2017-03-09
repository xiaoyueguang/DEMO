class Observer {
  constructor (obj) {
    let key
    let _observer = {}
    let _obj = {}
    for (key in obj) {
      _obj[key] = undefined
      Object.defineProperty(_observer, key, {
        get (val) {
          console.log(`你访问了${key}`)
          return _obj[key]
        },
        set (val) {
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
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});

app1.name
app1.age = 100
app2.university
app2.major = 'science'