class Vue {
  constructor (obj) {
    this.$el = document.getElementById(obj.el)
    let _data = obj.data
    let _ob = new Observer(_data)
    this.$data = _ob.data
    this.$watch = _ob.$watch
    this.$template = this.$el.innerHTML
    for (let key in obj.data) {
      _ob.$watch(key, () => {
        this.render()
      })
    }
    // let app3 = new Observer({ name: 'youngwind', age: 25 });
    // app3.$watch('age', function(age) {
    //   console.log(`我的年纪变了，现在已经是：${age}岁了`)
    // });
    // app3.data.age = 100;

    this.render()
  }

  render () {
    let renderReg = /[{]{2}[a-zA-Z_0-9.]*[}]{2}/g
    let template = this.$template
    this.$el.innerHTML = template.replace(renderReg, val => {
      return this.getData(val)
    })
  }

  getData (str) {
    str = str.replace(/[{}]{2}/g, '')
    let arr = str.split('.')
    let index = 0
    
    return this.getDataByArray(this.$data, arr)
  }

  getDataByArray (data, arr) {
    if (arr.length === 1) {
      return data[arr[0]]
    } else {
      return this.getDataByArray.call(this, data[arr[0]], (function () {
        arr.splice(0, 1)
        return arr
      })())
    }
  }
}