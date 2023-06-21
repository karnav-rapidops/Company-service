const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

const makeGetCompanybyId = require('./get-company-by-id');
const sandbox = sinon.createSandbox();

const companyDb = {
    getCompanyByIdDb: ()=>{

    }
}

const getCompnayByIdDbStub = sandbox.stub(companyDb, 'getCompanyByIdDb');
getCompnayByIdDbStub.callsFake((args)=>{
    expect(args).deep.equal({
        id: this.id
    })
    return '{"id":123}';
})

Given ("Company details id: {string} to get company details", (id)=>{
    this.id = id;
})  

When ("Try to get company details", async ()=>{
    const getCompanyById = makeGetCompanybyId({
        getCompanyByIdDb: companyDb.getCompanyByIdDb,
        validationError: exception.validationError,
        Joi,
    })

    try {
        this.result = await getCompanyById({ 
            id: this.id 
        });
    }
    catch(e){
        this.error = {
            name: e.name,
            error: e.message
        }
    }
})

Then ('It will give company details: "{string}"', (companyDetails)=>{
    expect(this.result).deep.equal(companyDetails);
})