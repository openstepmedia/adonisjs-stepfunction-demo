'use strict'

const QueueService = make('App/Services/QueueService')

class DemoController {
  async enqueue ({ params, request, response }) {
    // Name of the state function job, it helps to give this some kind of id
    // that maps back to an id in your application, so you can trace and debug.
    const name = request.input('name')

    // This is the payload of arguments you want to send to the worker
    const payload = {
      arg1: request.input('arg1'),
      arg2: request.input('arg2'),
      name: name
    }

    let job = null

    try {
      job = await QueueService.enqueue(name, payload)
    } catch (e) {
      // error out here...
      console.log('Error:', e)
    }

    // return some job info to caller
    response.json(job)
  }

  async form ({ view }) {
    const vars = {
      name: Date.now().toString()
    }
    return view.render('welcome', vars)
  }
}

module.exports = DemoController
