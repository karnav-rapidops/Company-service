const Joi = require('joi')
const axios = require('axios');
const exceptions = require('../../exceptions')

// Importing Db methods to inject them in use-cases maker functions 
const dbMethods = require('../../data-access');

// Import use-cases make functions 
const makeCheckCompanyByName = require('./check-company-by-name');
const makeInsertCompany = require('./insert-company');
const makeUpdtaeCompanyName = require('./update-company-name');
const makeDeleteCompany = require('./delete-company');
const makeGetCompanybyId = require('./get-company-by-id');
const makeGetAllCompany = require('./get-all-company');
const makeGetCompanyIdByName = require('./get-company-id-by-name');

// Call to maker functions and injecting db methods 

const checkCompanyByName = makeCheckCompanyByName({
    getCompanyByNameDb: dbMethods.cockroach.companyDbMethods.getCompanyByName,
    validationError: exceptions.validationError,
    Joi,
})

const insertCompany = makeInsertCompany({
    insertCompanyDb: dbMethods.cockroach.companyDbMethods.insertCompany,
    validationError: exceptions.validationError,
    checkCompanyByName,
    Joi,
});

const updateCompanyName = makeUpdtaeCompanyName({
    updateCompanyNameDb: dbMethods.cockroach.companyDbMethods.updateCompanyName,
    validationError: exceptions.validationError,
    forbiddenError: exceptions.forbiddenError,
    checkCompanyByName,
    Joi,
});

const deleteCompany = makeDeleteCompany({
    deleteCompanyDb: dbMethods.cockroach.companyDbMethods.deleteCompany,
    validationError: exceptions.validationError,
    axios,
    Joi,
})

const getCompanyById = makeGetCompanybyId({
    getCompanyByIdDb: dbMethods.cockroach.companyDbMethods.getCompanyById,
    validationError: exceptions.validationError,
    Joi,
})

const getAllCompany = makeGetAllCompany({
    getAllCompanyDb: dbMethods.cockroach.companyDbMethods.getAllCompany,
    validationError: exceptions.validationError,
    Joi,
})

const getCompanyIdByName = makeGetCompanyIdByName({
    getCompanyIdByNameDb: dbMethods.cockroach.companyDbMethods.getCompanyIdByName,
    validationError: exceptions.validationError,
    Joi,
})

module.exports = Object.freeze({
    insertCompany,
    updateCompanyName,
    deleteCompany,
    getCompanyById,
    getAllCompany,
    getCompanyIdByName,
})