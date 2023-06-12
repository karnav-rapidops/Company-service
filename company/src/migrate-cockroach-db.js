const {Sequelize} = require('sequelize')
const {Umzug, SequelizeStorage} = require('umzug')

    const sequelize = new Sequelize({

    // While connecting in docker 
    // database : 'company',
    // username : 'root',
    // password : '',    
    // host: 'cockroach_node1',
    // dialect: 'postgres',
    // port:26257,
    // ssl: false,

    // while connecting in local machine
    host: 'localhost',
    username: 'max',
    password: 'cockroach',
    port: 26257,
    database: 'company',
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        }

    }
});
        
        const umzug = new Umzug({
            migrations: { glob: "migrations/cockroach/*.js"},
            context: sequelize.getQueryInterface(),
            storage: new SequelizeStorage({sequelize}),
            logger: console,
        });

        (async () => await umzug.up())();
