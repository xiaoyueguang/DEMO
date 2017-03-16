function Observer (obj) {
    const _ob = {}
    const _data = {}

    for (let key in obj) {
      _data[key] = obj[key]

      Object.defineProperty(_data, key, {
        get () {
          console.log(`你访问了 ${key}: ${_data[key]}`)
          return _data[key]
        },

        set (val) {
          console.log(`你设置了 ${key}, 新的值为: ${_data[key]}`)
          _data[key] = val
        }
      })
    }

    this.data = _data

    return _ob
}

let app1 = Observer({
  name: 'linjilei',
  age: 25
});