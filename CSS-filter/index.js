const $blur = $('#blur')
const $sepia = $('#sepia')
const filter = Object.create(null)

const objToStr = obj => {
  let str = ''
  for (let key in obj) {
    str += `${key.toLocaleLowerCase()}(${obj[key]}) `
  }
  console.log(str)
  return str
}
const $filter = $('#filter')

const bind = (id, fn) => {
  const $elem = $(`#${id}`)
  const $text = $(`#${id}-text`)
  $elem.on('input', () => {
    const val = fn($elem[0].value)
    filter[id] = val
    $text.text(val)
    $filter.css('filter', objToStr(filter))
  })
}

const fn = {
  Blur (val) {
    return `${val / 10}px`
  },
  Sepia (val) {
    return val / 100
  },
  Grayscale (val) {
    return val / 100
  },
  Saturate (val) {
    return val / 10
  },
  ['Hue-rotate'] (val) {
    return `${(val * 3.6) | 0}deg`
  },
  Invert (val) {
    return val / 100
  },
  Opacity (val) {
    return val / 100
  },
  Brightness (val) {
    return val / 100
  },
  Contrast (val) {
    return val / 100
  },
  ['Drop-shadow'] (val) {
    return `16px 16px ${val}px orange`
  }

}

for (let id in fn) {
  bind(id, fn[id])
}
