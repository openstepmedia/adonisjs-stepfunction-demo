'use strict'

const { Command } = require('@adonisjs/ace')
const { ioc } = require('@adonisjs/fold')

/*
|--------------------------------------------------------------------------
| Stepfunctionworker Command
|--------------------------------------------------------------------------
| Starts an AWS StepFunction Worker that is located in app/Workers
|
| This tool effectively kicks off the daemon that will run and listen for
| it's predefine ActivityARN
|
| Usage:
| adonis stepfunctionworker --name=DemoWorker
*/

class Stepfunctionworker extends Command {
  static get signature () {
    return 'stepfunctionworker { --name=@value: Name of worker class }'
  }

  static get description () {
    return 'Start the Step Function Worker listener.'
  }

  async handle (args, options) {
    ioc.make('App/Workers/' + options.name)
  }
}

module.exports = Stepfunctionworker
