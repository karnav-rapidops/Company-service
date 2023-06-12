module.exports = function makeGetCompanybyId({
    getCompanyByIdDb,
    validationError,
    Joi,
})
{
    return async function getCompnayById({ cid })
    {
        // console.info("\nGET-COMPANY-BY-ID-USECASE");
        // console.info("company id: ", cid);

        const {error} = validateGetCompanyById({ cid })
        if(error)
            throw new validationError(error.message);


        let companyDetails = await getCompanyByIdDb({ cid });

        console.info("GET-COMPANY-BY-ID-USECASE-RESULT: ", companyDetails);
        return companyDetails;
    }

    function validateGetCompanyById({ cid })
    {
        const schema = Joi.object({
            cid: Joi.string().required(),
        })
        return schema.validate({ cid })
    }
}