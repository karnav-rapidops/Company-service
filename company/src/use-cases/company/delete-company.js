module.exports = function makeDeleteCompany({
    deleteEmployeeByCompanyId,
    deleteCompanyDb,
    validationError,
    Joi,
})
{
    return async function deleteCompany({ id })
    {
        validateInput({ id })

        await deleteEmployeeByCompanyId({ id })
        
        return await deleteCompanyDb({ id });
    }
    function validateInput({ id })
    {
        const schema = Joi.object({
           id: Joi.string().required(),
        })

        const { error } = schema.validate({ id });
        if(error)
            throw new validationError(error.message);
    }
}