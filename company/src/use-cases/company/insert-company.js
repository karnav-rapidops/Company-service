module.exports = function makeInsertCompany({
    insertCompanyDb,
    validationError,
    forbiddenError,
    checkCompanyByName,
    Joi,
})
{
    return async function insertCompany({ name, email, address, estYear, type })
    {        
        validateInput({ name, email, address, estYear, type })    

        // Check if company with provided name exist or not
        let companyListLength = await checkCompanyByName({ name })

        if(!companyListLength)
        {
            let companyid = await insertCompanyDb({ name, email, address, estYear, type });
            return companyid;
        }
        else {
            throw new forbiddenError(`company with name ${name} already exist!`);
        }
    }

    function validateInput({ name, email, address, estYear, type })
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(15).required(),
            email: Joi.string().required(),
            address: Joi.string().min(1).max(50).required(),
            estYear: Joi.string().min(4).max(4).required(),
            type: Joi.string().required(),
        })
        const {error} = schema.validate({ name, email, address, estYear, type })
        if(error)
            throw new validationError(error.message);
    }
}