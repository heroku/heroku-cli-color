import * as ansiStyles from 'ansi-styles'
import chalk from 'chalk'
import * as supports from 'supports-color'
import { deprecate } from 'util'

let stripColor = (s: string): string => {
  return require('strip-ansi')(s)
}

const dim = process.env.ConEmuANSI === 'ON' ? chalk.gray : chalk.dim

export const CustomColors: {
  supports: typeof supports
  gray: (s: string) => string
  grey: (s: string) => string
  dim: (s: string) => string
  attachment: (s: string) => string
  addon: (s: string) => string
  configVar: (s: string) => string
  release: (s: string) => string
  cmd: (s: string) => string
  pipeline: (s: string) => string
  app: (s: string) => string
  heroku: (s: string) => string
  stripColor: (s: string) => string
} = {
  supports,
  // map gray -> dim because it's not solarized compatible
  gray: dim,
  grey: dim,
  dim,
  attachment: chalk.cyan,
  addon: chalk.yellow,
  configVar: chalk.green,
  release: chalk.blue.bold,
  cmd: chalk.cyan.bold,
  pipeline: chalk.green.bold,
  app: (s: string) => chalk.enabled ? color.heroku(`⬢ ${s}`) : s,
  heroku: (s: string) => {
    if (!chalk.enabled) return s
    if (!color.supports) return s
    let has256 = color.supportsColor.has256 || (process.env.TERM || '').indexOf('256') !== -1
    return has256 ? '\u001b[38;5;104m' + s + ansiStyles.reset.open : chalk.magenta(s)
  },
  stripColor: deprecate(
    stripColor,
    '.stripColor is deprecated. Please import the "strip-ansi" module directly instead.',
  ),
}

export const color: typeof CustomColors & typeof chalk = new Proxy(chalk, {
  get: (chalk, name) => {
    if ((CustomColors as any)[name]) return (CustomColors as any)[name]
    return (chalk as any)[name]
  },
  set: (chalk, name, value) => {
    switch (name) {
      case 'enabled':
        chalk.enabled = value
        break
      default:
        throw new Error(`cannot set property ${name.toString()}`)
    }
    return true
  },
}) as typeof CustomColors & typeof chalk

export default color

const fix = async () => {
  // hack homebrew
  if (process.platform !== 'darwin') return
  const fs = require('fs-extra')
  const path = require('path')

  const brewRoot = path.join(process.env.HOMEBREW_PREFIX || '/usr/local')
  let binPath
  try {
    binPath = fs.realpathSync(path.join(brewRoot, 'bin/heroku'))
  } catch (err) {
    if (err.code === 'ENOENT') return
    throw err
  }
  let cellarPath: string
  if (binPath && binPath.startsWith(path.join(brewRoot, 'Cellar'))) {
    cellarPath = path.resolve(binPath, path.dirname(path.relative(binPath, path.join(brewRoot, 'Cellar/heroku'))))
  }

  const fetchInstallReceipt = async () => {
    if (!cellarPath) return
    return fs.readJSON(path.join(cellarPath, 'INSTALL_RECEIPT.json'))
  }
  const needsMigrate = async () => {
    if (new Date() < new Date(2018, 10, 1)) return false
    if ((process.env.HEROKU_UPDATE_INSTRUCTIONS || '').includes('brew')) return true
    let receipt = await fetchInstallReceipt()
    if (!receipt) return false
    return receipt.source.tap === 'homebrew/core'
  }

  if (await needsMigrate()) {
    // tslint:disable-next-line no-console
    console.error('Warning: Unsupported install. Install heroku with `brew install heroku/brew/heroku`')
    if (new Date() > new Date(2019, 0, 1)) {
      // tslint:disable-next-line no-console
      console.error(`TypeError: Cannot read property '' of undefined
    at Module._compile (internal/modules/cjs/loader.js:702:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:713:10)
    at Module.load (internal/modules/cjs/loader.js:612:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:551:12)
    at Function.Module._load (internal/modules/cjs/loader.js:543:3)
    at Module.require (internal/modules/cjs/loader.js:650:17)
    at require (internal/modules/cjs/helpers.js:20:18)
    at [eval]:1:1`)
      process.exit(1)
    }
  }
}
fix()
.catch(() => {})
