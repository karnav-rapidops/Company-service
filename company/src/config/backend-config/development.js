const config = {

    // Cockroach configurations for docker.
    // cockroach: {
    //     host: 'cockroach_node1',
    //     user: 'root',
    //     password: '',
    //     port: 26257,
    //     database: 'company',
    //     ssl: false,
    // }

    // Cockroach configurations for local machine.
    cockroach: {
        host: 'localhost',
        user: 'max',
        password: 'cockroach',
        port: 26257,
        database: 'company',
        ssl:{
            rejectUnauthorized: false
        }
    }
}

module.exports = config;