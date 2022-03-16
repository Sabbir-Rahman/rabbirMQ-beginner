// amqp = advance message queue protocol
const amqp = require("amqplib")

connect()

const message = { number: process.argv[2] }

async function connect() {
  try {
    const connection = await amqp.connect("amqp://localhost:5672")
    const channel = await connection.createChannel()
    // check queue exist or not if not then create
    const result = await channel.assertQueue("jobs")
    channel.sendToQueue("jobs", Buffer.from(JSON.stringify(message)))
    console.log(`Job sent successfully ${message.number}`)
  } catch (ex) {
    console.error(ex)
  }
}