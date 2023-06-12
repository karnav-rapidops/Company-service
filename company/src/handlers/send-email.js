const { Kafka } = require('kafkajs')
const email = require('../use-cases/email');
const companyDbMethods  = require('../data-access');

runConsumer();

async function runConsumer()
{   
    const kafka = new Kafka({
        clientId: 'microservices',
        brokers: ['localhost:9092']
      })

    const consumer = kafka.consumer({ groupId: 'group2' });
    await consumer.connect();
    await consumer.subscribe({
        topic: 'employee-registred'   
    })

    consumer.run({
        eachMessage: async ({ topic, partition, message })=>{
            console.log({
                    topic,
                    partition,
                    offset: message.offset, 
                });
            // emp-email, companyName will be recieved from producer.
            
            console.log("Object from producer: ", JSON.parse(message.value))
            
            const data = JSON.parse(message.value);

            // Get company email
            const companyEmail = await companyDbMethods.cockroach.companyDbMethods.getCompanyEmailByCompanyName({ cname: data.cname })

            // Company-email 
            await email.sendEmail({ cname: data.cname, email: companyEmail, empname: data.empname });
    }
})
}