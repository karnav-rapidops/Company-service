module.exports = function makeInsertCompany({
    insertCompanyDb,
    validationError,
    checkCompanyByName,
    Joi,
})
{
    return async function insertCompany({ cname, email, address, estyear, type })
    {
        const {error} = validateInsertCompany({ cname, email, address, estyear, type })

        if(error)
            throw new validationError(error.message);

        // Check if company with provided name exist or not
        let companyListLength = await checkCompanyByName({ cname })
        if(!companyListLength)
        {
            let companyid = await insertCompanyDb({ cname, email, address, estyear, type });
            return companyid;
        }
        else {
            throw new Error(`company with name ${cname} already exist!`);
        }
    }

    function validateInsertCompany({ cname, email, address, estyear, type })
    {
        const schema = Joi.object({
            cname: Joi.string().min(1).max(15).required(),
            email: Joi.string().required(),
            address: Joi.string().min(1).max(50).required(),
            estyear: Joi.string().min(4).max(4).required(),
            type: Joi.string(),
        })
        return schema.validate({ cname, email, address, estyear, type })
    }
}