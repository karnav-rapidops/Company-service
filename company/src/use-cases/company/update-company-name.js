module.exports = function makeUpdtaeCompanyName({
    updateCompanyNameDb,
    checkCompanyByName,
    validationError,
    forbiddenError,
    Joi,
})
{
    return async function updateCompanyName({ cid, cname })
    {
        // console.info("\nUPDATE-COMPANY-NAME-USECASE")
        // console.info("company name: ", cname);
        // console.info("company id: ", cid);

        const { error } = validateUpdateCompany({ cid, cname })

        if(error)
            throw new validationError(error.message);

        // Checking if any company already exist with provided new company name 
        let companyListLength = await checkCompanyByName({ cname });

        if(!companyListLength)
        {
            let companyid = await updateCompanyNameDb({ cid, cname });

            // update company name in employees (kafka)/(call to use-case)

            return companyid;
        }
        else {
            throw new forbiddenError(`Company with name ${cname} already exist!`);
        }
    }

    function validateUpdateCompany({ cid, cname })
    {
        const schema = Joi.object({
            cid: Joi.string().required(),
            cname: Joi.string().min(1).max(15).required(),
            
        })
        return schema.validate({ cid, cname })
    }

}