const axios = require('axios');
const Joi = require('joi');

const makeDeleteEmployeeByCompanyId = require('./delete-employee-by-company-id');
const deleteEmployeeByCompanyId = makeDeleteEmployeeByCompanyId({
    axios,
    Joi,
})

module.exports = Object.freeze({
    deleteEmployeeByCompanyId,
})