'use strict'

const { test } = use('Test/Suite')('QueueService')

const QueueService = make('App/Services/QueueService')

/**
 * Start the AWS Step function by sending it a payload.
 * adonis test -f QueueService.spec.js -g "QueueService.start"
 */
test('QueueService.start', async ({ assert }) => {
  const name = Date.now().toString()
  const payload = {
    sourceId: 123456,
    description: 'This is a demo parameter',
    arg: 'arg1',
    name: name
  }

  const output = await QueueService.start(name, payload)

  console.log('output:', output)
}).timeout(0)
