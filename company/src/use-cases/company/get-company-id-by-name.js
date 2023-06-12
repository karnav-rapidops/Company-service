module.exports = function makeGetCompanyIdByName({
    getCompanyIdByNameDb,
    validationError,
    Joi,
})
{
    return async function getCompanyIdByName({ cname })
    {
        console.info("\nGET-COMPANY-ID-BY-NAME-USECASE");
        console.info("company name: ", cname);

        const {error} = validateGetCompanyIdByName({ cname })
        if(error)
            throw new validationError(error.message);

        // Check if company with this name exist or not 

        let companyid = await getCompanyIdByNameDb({ cname });

        console.info("GET-COMPANY-ID-BY-NAME-USECASE-RESULT: ", companyid);
        return companyid;
    }

    function validateGetCompanyIdByName({ cname })
    {
        const schema = Joi.object({
            cname: Joi.string().min(1).max(15).required(),
        })
        return schema.validate({ cname })
    }
}