module.exports = function makecheckCompanyByName({
    getCompanyByNameDb,
    validationError,
    Joi,
})
{
    return async function checkCompanyByName({ name })
    {
        validateInput({ name })

        return await getCompanyByNameDb({ name });
    }
    function validateInput({ name })
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(15).required(),
        })
        const {error} = schema.validate({ name })
        if(error)
            throw new validationError(error.message);   
    }
}