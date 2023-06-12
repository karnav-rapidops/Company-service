const { Kafka } = require('kafkajs');
const makeProducer = require('./producer')

const producer = makeProducer({
    Kafka,
})

module.exports = Object.freeze({
    producer,
})