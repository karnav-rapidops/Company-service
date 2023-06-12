module.exports = function makeProducer({
    Kafka,
})
{
    return async function producer({ topic, message })
    {
        const kafka = new Kafka({
            clientId: 'microservices',
            brokers: ['localhost:9092']
        })
        const producer = kafka.producer();
        await producer.connect();

        await producer.send({
            topic: topic,
            messages: [
                {
                    value: JSON.stringify(message)
                },
            ]
        })
    }
}