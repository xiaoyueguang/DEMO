class Vue {
  constructor (obj) {
    this.$el = document.getElementById(obj.el)
    this.$data = obj.data
    this.$template = this.$el.innerHTML
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