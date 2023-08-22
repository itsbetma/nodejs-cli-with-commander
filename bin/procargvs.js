#!/usr/bin/env node
const args = process.argv
const myArgs = args.slice(2)
// Gets the options eg. word that starts with '-'
const options = myArgs.filter((a) => a.startsWith(`-`))
const values = myArgs.filter((a) => !a.startsWith('-'))

let result = ''

const renderValues = (operator, total) => {
  return `\n|  ${values.join(` ${operator} `)} = ${total}`
}

const calculate = (operator, func) => {
  if (values && values.length > 0) {
    const t = values.reduce(func)
    return renderValues(operator, t)
  }
  return ''
}

const calculateFactorial = () => {
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

options.map((o) => {
  switch (o) {
    case '-sum':
      result += calculate('+', (p, v) => Number(p) + Number(v))
      break

    case '-mul':
      result += calculate('*', (p, v) => Number(p) * Number(v))
      break

    case '-div':
      result += calculate('/', (p, v) => Number(p) / Number(v))
      break

    case '-sub':
      result += calculate('-', (p, v) => Number(p) - Number(v))
      break

    case '-fac':
      result += calculateFactorial()
      break

    default:
      break
  }
})

console.log('------------------------------', result, '\n------------------------------')
