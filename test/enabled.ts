import color from '../src'

console.log(color.red('foo'))
console.log(color.attachment('foo'))
console.log('disabling')
color.enabled = false
console.log(color.red('foo'))
console.log(color.attachment('foo'))
console.log('enabling')
color.enabled = true
console.log(color.red('foo'))
console.log(color.attachment('foo'))
