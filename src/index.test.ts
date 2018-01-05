import color from '.'

beforeEach(() => {
  color.enabled = true
})

afterEach(() => {
  color.enabled = false
})

test('enabled', () => {
  expect(color.red('foo')).toEqual('\u001b[31mfoo\u001b[39m')
  expect(color.attachment('foo')).toEqual('\u001b[36mfoo\u001b[39m')
})

test('disabled', () => {
  color.enabled = false
  expect(color.red('foo')).toEqual('foo')
  expect(color.attachment('foo')).toEqual('foo')
})
