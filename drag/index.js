let $frame1 = document.querySelector('#frame1')
let $frame2 = document.querySelector('#frame2')

let $frame = document.querySelector('.wrap')

let setDiv = setElemDrag(getDivs($frame))
setDiv()

let dragElem
let dragElemStyleBorder
$frame.addEventListener('dragstart', function (event) {
  dragElem = event.target
  dragElemStyleBorder = dragElem.style.border
  dragElem.style.border = '1px dashed #f23'
})

$frame.addEventListener('dragover', function (event) {
  event.preventDefault()
})

$frame.addEventListener('dragenter', function (event) {
  $frame1.style.background = '#fff'
  $frame2.style.background = '#fff'
  if (event.target.className === 'frame') {
    event.target.style.background = '#eee'
  }
})

$frame.addEventListener('drop', function (event) {
  $frame1.style.background = '#fff'
  $frame2.style.background = '#fff'
  dragElem.style.border = dragElemStyleBorder
  if (event.target.className === 'frame') {
    event.target.appendChild(dragElem)
    dragElem = null
  }
})

function setElemDrag (divs) {
  return function () {
    divs.forEach(div => {
      div.draggable = div.className !== 'frame'
    })
  }
}

function getDivs ($frame) {
  return $frame.querySelectorAll('div')
}

let count = 3
function addClickEventBuild ($elem) {
  return function () {
    let elem = document.createElement('div')
    elem.innerHTML = '拖拽元素' + (count ++)
    elem.draggable = true
    $elem.appendChild(elem)
    elem = null
  }
}

document.querySelector('#button1').addEventListener('click', addClickEventBuild($frame1))
document.querySelector('#button2').addEventListener('click', addClickEventBuild($frame2))