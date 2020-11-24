'use strict'

const { test } = use('Test/Suite')('DemoWorker')

test('DemoWorker', async ({ assert }) => {
  assert.equal(2 + 2, 4)
})
