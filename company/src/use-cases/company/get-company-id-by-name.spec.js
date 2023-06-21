const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function 
const makeGetCompanyIdByName = require('./get-company-id-by-name');
const sandbox = sinon.createSandbox();

const companyDb = {
    getCompanyIdByNameDb: ()=>{
    }
}

const getCompanyIdByNameDbStub = sandbox.stub(companyDb, 'getCompanyIdByNameDb');
getCompanyIdByNameDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        name: this.name,
    })
    return '1';
})

Given ("Company details name: {string} to get company id", (name)=>{
    this.name = name;
})

When ("Try to get company id by name", async ()=>{
    const getCompanyIdByName = makeGetCompanyIdByName({
        getCompanyIdByNameDb: companyDb.getCompanyIdByNameDb,
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await getCompanyIdByName({ 
            name: this.name
         })
    }
    catch(e) {
        this.error = {
            name: e.name,
            message: e.message
        }
    }
})

Then ('It will give error: {string} with message: "{string}"', (error, message)=>{
    expect(this.error).deep.equal({
        name: error,
        message
    })
})

Then ('It will give company id: "{string}"', (id)=>{
    expect(this.result).deep.equal(id);
})