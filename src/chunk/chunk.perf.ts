// tslint:disable no-console

import { Event, Suite } from 'benchmark'
import { chunk as lodashChunk } from 'lodash'
import { chunk } from './chunk'

const arr = Array(16).fill(0)
const size = 3

new Suite()
  .add('my chunk', () => {
    chunk(arr, size)
  })
  .add('lodash chunk', () => {
    lodashChunk(arr, size)
  })
  .on('cycle', (e: Event) => {
    console.log(e.target.toString())
  })
  .run({ async: true })
