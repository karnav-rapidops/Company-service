module.exports = function makeUpdateCompany({
    updateCompanyDb,
    updateCompanyFieldDb,
    Joi,
})
{
    return async function updateCompany({ data, httpMethod })
    {

        const { error } = validateInput({ data, httpMethod })


        // If http method is PUT update all fields.
        if(httpMethod == 'PUT')
        {
            let updatedId = await updateCompanyDb({ id: data.id, name: data.name, email: data.email, address: data.address, estYear: data.estYear, type: data.type })

            return updatedId;
        }
        // If http method is PATCH update specified filed with new value.
        else {
            let updatedId = await updateCompanyFieldDb({ id: data.id, fieldToUpdate: data.fieldToUpdate, newValue: data.newValue });
            return updatedId;
        }
    }

    function validateInput({ data, httpMethod })
    {   
        let schema;

        if(httpMethod == 'PUT')
        {
            schema = Joi.object({
                id: Joi.string().required(),
                name: Joi.string().min(1).min(15).required(),
                address: Joi.string().max(50).required(),
                type: Joi.string().required(),
                email: Joi.string().email().required(),
                estYear: Joi.string().required(),  
            })
        }
        else {
            schema = Joi.object({
                id: Joi.string().required(),
                fieldToUpdate: Joi.string().required(),
                newValue: Joi.string().required(),
            })
        }
        return schema.validate(data)
    }

}