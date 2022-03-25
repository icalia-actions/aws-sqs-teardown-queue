import {info, getInput, setOutput} from '@actions/core'

import SQS, {DeleteQueueRequest} from 'aws-sdk/clients/sqs'

import {AWSError} from 'aws-sdk/lib/error'

let region: string | undefined
region = process.env.AWS_REGION
if (!region) region = process.env.AWS_DEFAULT_REGION

const client = new SQS({
  region,
  customUserAgent: 'icalia-actions/aws-action'
})

async function getQueueUrl(queueName: string): Promise<string | undefined> {
  try {
    const result = await client.getQueueUrl({QueueName: queueName}).promise()
    return result.QueueUrl
  } catch (err) {
    if ((err as AWSError).code === 'AWS.SimpleQueueService.NonExistentQueue') {
      return
    }

    throw err
  }
}

export async function run() {
  const queueName = getInput('queue-name', {required: true})

  let queueUrl = await getQueueUrl(queueName)
  if (!queueUrl) {
    info(`The queue "${queueName}" doesn't exist. Skipping...`)
  } else {
    const result = await client.deleteQueue({QueueUrl: queueUrl}).promise()
    info(`The queue "${queueName}" was successfully deleted.`)
  }

  return 0
}
