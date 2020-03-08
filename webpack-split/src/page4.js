// import {sum} from './tools'
// import { add } from 'lodash'

// console.log('page4')
// console.log(sum(1, 2))
// console.log(add(1, 2))
import('lodash').then(({ add }) => {
  console.log(add(1, 2))
})