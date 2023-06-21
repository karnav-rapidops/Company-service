module.exports = function makeGetCompanyIdByName({
    getCompanyIdByNameDb,
    validationError,
    Joi,
})
{
    return async function getCompanyIdByName({ name })
    {
        validateInput({ name })
            
        // Check if company with this name exist or not 
         
        return await getCompanyIdByNameDb({ name });
    }

    function validateInput({ name })
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(15).required(),
        })

        const { error } = schema.validate({ name })
        
        if(error)
        {
            throw new validationError(error.message);
        } 
    }
}