// tslint:disable no-console

import { Event, Suite } from 'benchmark'
import { difference as lodashDifference } from 'lodash'
import { difference } from './difference'

const a = [1, 2, 3, 4, 3, 2, 4, 3, 4, 5, 4, 5]
const b = [6, 5, 4, 5, 6, 5, 4, 3, 2, 3, 4, 3, 3, 4, 5, 4, null]

new Suite()
  .add('my chunk', () => {
    difference(a, b)
  })
  .add('lodash chunk', () => {
    lodashDifference(a, b)
  })
  .on('cycle', (e: Event) => {
    console.log(e.target.toString())
  })
  .run({ async: true })
