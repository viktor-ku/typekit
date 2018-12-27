import { Perf } from '@/Perf'
import { chunk as lodashChunk } from 'lodash'
import { chunk } from './chunk'

const arr = Array(16).fill(0)
const size = 3

new Perf('chunk')
  .my(() => {
    chunk(arr, size)
  })
  .lodash(() => {
    lodashChunk(arr, size)
  })
  .run()
