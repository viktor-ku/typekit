import { Perf } from '@/Perf'
import { difference as lodashDifference } from 'lodash'
import { difference } from './difference'

const a = [, 1, 2, 3, 4, 3, 2, 4, 3, 4, 5, 4, 5]
const b = [6, 5, 4, 5, 6, 5, 4, 3, 2, 3, 4, 3, 3, 4, 5, 4, null]

new Perf('difference')
  .my(() => {
    difference(a, b)
  })
  .lodash(() => {
    lodashDifference(a, b)
  })
  .run()
