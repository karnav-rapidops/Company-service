module.exports = function makeGetCompanybyId({
    getCompanyByIdDb,
    validationError,
    Joi,
})
{
    return async function getCompnayById({ id })
    {
        validateInput({ id })

        return await getCompanyByIdDb({ id });
    }

    function validateInput({ id })
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })
        const {error} = schema.validate({ id })
        if(error)
            throw new validationError(error.message);
    }
}