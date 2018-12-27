// tslint:disable no-console

import * as Benchmark from 'benchmark'
import chalk from 'chalk'
import * as filesize from 'filesize'
import * as ora from 'ora'
import * as os from 'os'

const color = {
  primary: chalk.blue,
}

type Subject = () => void

const oraOptions: ora.Options = {
  color: 'blue',
  interval: 32,
}

function percentDiff(a: number, b: number): string {
  const min = Math.min(a, b)
  const max = Math.max(a, b)

  return ((100 * max / min) - 100).toFixed(2) + '%'
}

function about() {
  console.log(color.primary.bold('='), 'About the system')
  console.group()

  const info = [[
    'Node',
    process.versions.node,
  ], [
    'V8',
    process.versions.v8,
  ], [
    'OS',
    `${os.type()} ${os.release()} ${os.arch()}`,
  ], [
    'CPU',
    os.cpus()[0].model,
  ], [
    'RAM',
    filesize(os.totalmem()),
  ]]

  info.forEach(([key, value]) => {
    console.log(color.primary(`${key}:`), value)
  })

  console.groupEnd()
  console.log()
}

export class Perf {
  private suite = new Benchmark.Suite(this.name).on('cycle', (e: Benchmark.Event) => {
    console.log(
      chalk.bold(color.primary.bold('>')),
      e.target.toString(),
    )
  })

  constructor(private name: string) {
    about()
  }

  public add(name: string, subject: Subject) {
    const spinner = ora({
      text: name,
      ...oraOptions,
    })

    this.suite.add(name, subject, {
      onStart: () => {
        spinner.start()
      },
      onComplete: () => {
        spinner.stop()
      },
    })

    return this
  }

  public my(subject: Subject) {
    this.add(`my ${this.name}`, subject)
    return this
  }

  public lodash(subject: Subject) {
    this.add(`lodash ${this.name}`, subject)
    return this
  }

  public run() {
    this.suite
      .run({ async: true })
      .on('complete', (e: Benchmark.Event) => {
        const res = Object
          .entries(e.currentTarget)
          .filter(([key, bench]: [string, Benchmark]) => +key >= 0)
          .map(([key, bench]: [string, Benchmark]) => bench)

        let fastest = res[0]

        res.slice(1).forEach((bench) => {
          if (bench.hz > fastest.hz) {
            fastest = bench
          }
        })

        // assume that we will have only two tartets at a time
        const slowest = res.find((bench) => bench !== fastest)!

        const fastestName = (fastest as any).name as string

        console.log()
        console.log(color.primary.bold('='), 'Results:')

        const diff = percentDiff(fastest.hz, slowest.hz)

        console.group()
        console.log(
          color.primary(fastestName),
          'is',
          color.primary(diff),
          'faster',
        )
        console.groupEnd()
      })
  }
}
