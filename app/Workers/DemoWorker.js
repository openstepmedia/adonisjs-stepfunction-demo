'use strict'

const StepFunctionWorker = require('step-function-worker')
const AWS = require('aws-sdk')
const Env = use('Env')
const Logger = use('Logger')

/*
|--------------------------------------------------------------------------
| DemoWorker
|--------------------------------------------------------------------------
| @see https://github.com/piercus/step-function-worker
|
| For this class to work, a StepFunction activity must first be configured on AWS
*/

class DemoWorker extends StepFunctionWorker {
  constructor () {
    const options = {}

    // Configure the connection to AWS
    options.awsConfig = new AWS.Config({
      accessKeyId: Env.get('AWS_ACCESS_KEY'),
      secretAccessKey: Env.get('AWS_SECRET_KEY'),
      region: Env.get('AWS_REGION')
    })

    // Function that interacts directly with the AWS StepFunction this must be defined
    // The call back is responsible for letting the State Machine know it can either
    // continue to the next step in execution or fail
    options.fn = async (input, cb, heartbeat) => {
      // Respond to StepFunction state machine
      Logger.info('Custom Worker function:', input)
      cb(null, input)
    }

    // the ID of the Step Function Activity arn:aws:states:us-east-1:XXXXXXXXXXXXX:activity:DemoWorkerActivity
    options.activityArn = Env.get('AWS_ACTIVITY_ARN_DEMOWORKERACTIVITY')

    super(options)
    this._initCallbacks()
  }

  _initCallbacks () {
    this.on('task', this.task)
    this.on('ready', this.ready)
    this.on('error', this.error)
    this.on('failure', this.failure)
    this.on('success', this.success)
  }

  /**
   * Called when the worker "wakes up"
   * The StepFunctionWorker parent class will pass in the payload
   * @param {*} task
   */
  task (task) {
    // task.input contains the payload from the web
    Logger.info('DemoWorker task:', task.input)
  }

  ready () {
    Logger.info('DemoWorker is ready')
  }

  failure (failure) {
    Logger.info('DemoWorker failure:', failure)
  }

  success (output) {
    // output.input will contain the payload from the web
    Logger.info('DemoWorker success:', output.input)
  }

  error (err) {
    Logger.info('DemoWorker error:', err)
  }
}

module.exports = DemoWorker
