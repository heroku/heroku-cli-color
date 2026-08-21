import {afterEach, beforeEach, expect, test} from 'vitest'

import color from './color'

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

test('app', () => {
  expect(color.app('foo')).toEqual('\u001b[38;5;104m⬢ foo\u001b[0m')
  color.enabled = false
  expect(color.app('foo')).toEqual('foo')
})

test('cannot set things', () => {
  expect(() => ((color as any).foo = 'bar')).toThrowError(/cannot set property foo/)
})
