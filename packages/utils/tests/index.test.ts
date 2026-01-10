import { expect, test } from 'vitest'
import { render } from '../src/index'

test('render', () => {
  expect(render).toBeDefined()
  expect(typeof render).toBe('function')
})
