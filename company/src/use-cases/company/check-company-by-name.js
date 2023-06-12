module.exports = function makecheckCompanyByName({
    getCompanyByNameDb,
    validationError,
    Joi,
})
{
    return async function checkCompanyByName({ cname })
    {
        // console.info("\nCHECK-COMPANY-BY-NAME-USECASE");
        // console.info("company name: ", cname);

        const {error} = validateCheckCompanyByName({ cname })
        if(error)
            throw new validationError(error.message);

        let companyListLength = await getCompanyByNameDb({ cname });

        // console.info("CHECK-COMPANY-BY-NAME-USECASE-RESULT: ", companyListLength);
        return companyListLength;
    }
    function validateCheckCompanyByName({ cname })
    {
        const schema = Joi.object({
            cname: Joi.string().min(1).max(15).required(),
        })
        return schema.validate({ cname })
    }
}