const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// import usecase maker function
const makeDeleteCompany = require('./delete-company');
const sandbox = sinon.createSandbox();

const companyDb = {
    deleteCompanyDb: ()=>{
    }
}

const deleteCompanyDbStub = sandbox.stub(companyDb, 'deleteCompanyDb');
deleteCompanyDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: this.id,
    })
    return '1';
})

const internalServiceCall = {
    deleteEmployeeByCompanyId : ()=>{
    }
}

const deleteEmployeeByCompanyIdStub = sandbox.stub(internalServiceCall, 'deleteEmployeeByCompanyId');
deleteEmployeeByCompanyIdStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: this.id
    })

    return
})

Given ("Company details id: {string}", (id)=>{
    this.id = id;
})  

When ("Try to delete company", async ()=>{
    const deleteCompany = makeDeleteCompany({
        deleteEmployeeByCompanyId: internalServiceCall.deleteEmployeeByCompanyId,
        deleteCompanyDb: companyDb.deleteCompanyDb,
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await deleteCompany({
            id: this.id,
        })

    }
    catch(error)
    {
        this.error = {
            name: error.name,
            message: error.message
        }
    }
})

Then ('It will throw error: {string} with message: "{string}" while deleting company', (error, message)=>{  
    expect(this.error).deep.equal({
        name: error,
        message
    })
})

Then ('It will delete company with details: "{string}"', (deletedCompanyDetails)=>{
    expect(this.result).deep.equal(deletedCompanyDetails);
})