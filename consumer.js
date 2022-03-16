// amqp = advance message queue protocol
const amqp = require('amqplib')

connect()

async function connect() {
  try {
    const connection = await amqp.connect('amqp://localhost:5672')
    const channel = await connection.createChannel()
    // check queue exist or not if not then create
    const result = await channel.assertQueue('jobs')

    channel.consume("jobs", message => {
      const input = JSON.parse(message.content.toString())
      console.log(`Received job with input ${input.number}`)
    })

    console.log('Waiting for messages')
    
  } catch (ex) {
    console.error(ex)
  }
}
