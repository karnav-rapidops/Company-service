// ------------------------- Connection part ----------------------------------------

const { Pool } = require('pg');
const config = require('../../config');

const pool = new Pool({
    host: config.cockroach.host,
    user: config.cockroach.user,
    password: config.cockroach.password,
    port: config.cockroach.port,
    database: config.cockroach.database,
    ssl: {
        rejectUnauthorized: false
    }
    // ssl: false,
})
pool.connect()
    .then(() => console.log(`cockroachDb connected on port ${config.cockroach.port}`))
    .catch((e) => console.error(`Error while connecting cockroachDb!\n${e}`))

// ----------------------------------- use-cases -----------------------------------------

const makeCompanyDbMethods = require('./company-db-methods');
const companyDbMethods = makeCompanyDbMethods({
    pool,
});


module.exports = Object.freeze({
    companyDbMethods,  
})