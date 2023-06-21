const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import maker function
const makecheckCompanyByName = require('./check-company-by-name');
const sandbox = sinon.createSandbox();

// Object containing fake function
const companyDb = {
    getCompanyByNameDb: ()=>{   

    }
}

// Stub 
const getCompanyByNameDbStub = sandbox.stub(companyDb, 'getCompanyByNameDb');
getCompanyByNameDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        name: this.name,
    })
    return "[{'id':abc}]";
})

Given ("Company details name: {string}", (name)=>{
    this.name = name 
}) 

When ("Try to check company by name", async ()=>{
    const checkCompanyByName = makecheckCompanyByName({
        getCompanyByNameDb: companyDb.getCompanyByNameDb,
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await checkCompanyByName({ 
            name: this.name
         })
    }
    catch(e)
    {
        this.error = {
            name: e.name,
            message: e.message,
        };
    }
})

Then ('It will throw error: {string} with message: "{string}" while checking company by name company', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message,
    })
})

Then ('It will give companyList: "{string}" after checking company by name', (companyList)=>{
    expect(this.result).deep.equal(companyList);
})
