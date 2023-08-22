#!/usr/bin/env node
import { Command } from 'commander'
const program = new Command()

const renderValues = (operator, total, values) => {
  return `\n${values.join(` ${operator} `)} = ${total}`
}

const calculate = (operator, func, values) => {
  if (values && values.length > 0) {
    const t = values.reduce(func)
    return renderValues(operator, t, values)
  }
  return ''
}

const calculateFactorial = (values) => {
  if (values && values.length > 0) {
    let base = Number(values[0])
    let t = base
    for (let i = base - 1; i < base && i >= 1; i--) {
      t *= i
    }
    return `\n!${base} = ${t}`
  }
  return ''
}

program.name('commander-js-calculator').description('CLI to run calculations.').version('0.0.1')

program
  .command('calculate')
  .description('Run a given calculation')
  .argument('<number...>', 'numbers to calculate')
  .option('-sum', 'sum', '')
  .option('-mul', 'multiply', '')
  .option('-div', 'divide', '')
  .option('-sub', 'subtract', '')
  .option('-fac', 'factorial', '')
  .action((numbers, options) => {
    if (options.sum) {
      console.log(calculate('+', (p, v) => Number(p) + Number(v), numbers))
    }
    if (options.mul) {
      console.log(calculate('*', (p, v) => Number(p) * Number(v), numbers))
    }
    if (options.div) {
      console.log(calculate('/', (p, v) => Number(p) / Number(v), numbers))
    }
    if (options.sub) {
      console.log(calculate('-', (p, v) => Number(p) - Number(v), numbers))
    }
    if (options.fac) {
      console.log(calculateFactorial(numbers))
    }
  })

program.parse()
