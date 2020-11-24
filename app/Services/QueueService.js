'use strict'
const AWS = require('aws-sdk')
const Env = use('Env')

class QueueService {
  /**
   * Returns result of StepFunctions.startExecution
   * @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/StepFunctions.html#startExecution-property
   */
  async enqueue (name, payload) {
    const awsConfig = new AWS.Config({
      accessKeyId: Env.get('AWS_ACCESS_KEY'),
      secretAccessKey: Env.get('AWS_SECRET_KEY'),
      region: Env.get('AWS_REGION')
    })

    const StepFunctions = new AWS.StepFunctions(awsConfig)

    // @see .env file - this contains
    const stateMachineArn = Env.get('AWS_STATEMACHINE_ARN')

    // using the job.id as the name may be easier to debug
    // @todo unclear if job.id as the statemachine name will cause conflict... is it better to use uuid?
    var params = {
      name: name,
      input: JSON.stringify(payload),
      stateMachineArn: stateMachineArn
    }

    // Execute StepFunction
    // @see https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/StepFunctions.html#startExecution-property
    let result = null
    try {
      result = await StepFunctions.startExecution(params).promise()
    } catch (e) {
      console.log('Error:', e)
    }

    return result
  }
}

module.exports = QueueService
