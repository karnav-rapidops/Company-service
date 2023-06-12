// Importing other NPMs to use 
const Joi = require('joi')
const axios = require('axios');

// Import company usecases to inject dependency using controllers makers functions
const company = require('../../use-cases/company'); 

// Import controllers maker functions
const makeInsertCompanyAction = require('./insert-company');
const makeUpdateCompanyNameAction = require('./update-company-name');
const makeDeleteCompanyAction = require('./delete-company');
const makeGetCompanyByIdAction = require('./get-company-by-id');
const makeGetAllCompanyAction = require('./get-all-company');
const makeGetCompanyIdByName = require('./get-company-id-by-name')

// Call to maker functions and injecting use-cases
const insertCompanyAction = makeInsertCompanyAction({
    insertCompany: company.insertCompany,
    Joi,
});

const updateCompanyNameAction = makeUpdateCompanyNameAction({
    updateCompanyName: company.updateCompanyName,
    Joi,
});

const deleteCompanyAction = makeDeleteCompanyAction({
    deleteCompany: company.deleteCompany,
    Joi,
})

const getCompanyByIdAction = makeGetCompanyByIdAction({
    getCompanyById: company.getCompanyById,
    Joi,
})

const GetAllCompanyAction = makeGetAllCompanyAction({
    getAllCompany: company.getAllCompany,
    Joi,
})

const getCompanyIdByNameAction = makeGetCompanyIdByName({
    getCompanyIdByName: company.getCompanyIdByName,
    Joi,
}) 


// Exporting controllers which will be used while routing
module.exports = Object.freeze({
    insertCompanyAction,
    updateCompanyNameAction,
    deleteCompanyAction,
    getCompanyByIdAction,
    GetAllCompanyAction,
    getCompanyIdByNameAction,
})