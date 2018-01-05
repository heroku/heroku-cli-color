import * as supports from 'supports-color'
import chalk from 'chalk'
import * as ansiStyles from 'ansi-styles'
import { deprecate } from 'util'

export const CustomColors: {
  supports: typeof supports
  gray: (s: string) => string
  grey: (s: string) => string
  attachment: (s: string) => string
  addon: (s: string) => string
  configVar: (s: string) => string
  release: (s: string) => string
  cmd: (s: string) => string
  pipeline: (s: string) => string
  app: (s: string) => string
  heroku: (s: string) => string
  stripColor: (s: string) => any
} = {
  supports,
  // map gray -> dim because it's not solarized compatible
  gray: chalk.dim,
  grey: chalk.dim,
  attachment: chalk.cyan,
  addon: chalk.yellow,
  configVar: chalk.green,
  release: chalk.blue.bold,
  cmd: chalk.cyan.bold,
  pipeline: chalk.green.bold,
  app: (s: string) => color.heroku(`⬢ ${s}`),
  heroku: (s: string) => {
    if (!color.supports) return s
    let has256 = color.supports.has256 || (process.env.TERM || '').indexOf('256') !== -1
    return has256 ? '\u001b[38;5;104m' + s + ansiStyles.reset.open : chalk.magenta(s)
  },
  stripColor: (s: string) => {
    return deprecate(() => {
      const stripAnsi = require('strip-ansi')
      return stripAnsi(s)
    }, '.stripColor is deprecated. Please import the "strip-ansi" module directly instead.')
  },
}

export const color: typeof CustomColors & typeof chalk = new Proxy(chalk, {
  get: (chalk, name) => {
    if ((<any>CustomColors)[name]) return (<any>CustomColors)[name]
    return (<any>chalk)[name]
  },
}) as typeof CustomColors & typeof chalk

export default color
