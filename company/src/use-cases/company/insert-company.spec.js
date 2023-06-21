const {Given, When, Then, After} = require('@cucumber/cucumber');
const exception = require('../../exceptions')
const expect = require('chai').expect;
const sinon = require('sinon');
const Joi = require('joi');

// Import use-case maker function
const makeInsertCompany = require('./insert-company');
const sandbox = sinon.createSandbox();

// companyDb object for function which will be stub
const companyDb = {
    insertCompanyDb: ()=>{
    },
    checkCompanyByName: ()=>{
    }
}

const insertCompanyDbStub = sandbox.stub(companyDb, 'insertCompanyDb')
insertCompanyDbStub.callsFake((args)=>{ 
  expect(args).deep.equal({ 
    name: this.name, 
    email: this.email, 
    address: this.address, 
    estYear: this.estYear, 
    type: this.type, 
  })

  return '123';
})

const checkCompanyByNameStub = sandbox.stub(companyDb, 'checkCompanyByName');
checkCompanyByNameStub.callsFake((args)=>{
  expect(args).deep.equal({
        name: this.name,
    })
    return
})


Given ("Company details name: {string}, email: {string} , address: {string} , estYear: {string} , type: {string} to create new company", (name, email, address, estYear, type)=>{
    this.name = name || undefined;
    this.email =  email || undefined;
    this.address = address || undefined;
    this.estYear = estYear || undefined;
    this.type = type || undefined;
})

When ('Try to create new company', async () => {
    const insertCompany = makeInsertCompany({
        insertCompanyDb: companyDb.insertCompanyDb,
        validationError: exception.validationError,
        forbiddenError: exception.forbiddenError,
        checkCompanyByName: companyDb.checkCompanyByName,
        Joi,
    }); 
  
    try {
      this.result = await insertCompany({
        name: this.name,
        email: this.email,
        address: this.address,
        estYear: this.estYear,
        type: this.type
      });
    } 
    catch (error) {
      this.error = {
        name: error.name,
        message: error.message,
      };
    }
});

Then('It will throw error: {string} with message: "{string}" while creating new company', (error, message) => {
    expect(this.error).deep.equal({
      name: error,
      message,
    });
  });

Then('It will create new company with details: "{string}"', (newCompanyDetails) => {
  expect(this.result).deep.equal(newCompanyDetails)
});
