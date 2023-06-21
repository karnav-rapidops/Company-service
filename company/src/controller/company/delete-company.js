module.exports = function makeDeleteCompanyAction({
    deleteCompany,
    Joi,
})
{
    return async function deleteCompanyAction(req, res)
    {        
        try
        {
            let id = req.params.id;
        
            const { error } = validateDeleteCompanyAction({ id })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let deletedCompanyId = await deleteCompany({ id });

            res.status(200).send(deletedCompanyId);  
        }
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        }
    }
    function validateDeleteCompanyAction({ id })
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })
        return schema.validate({ id })
    }
}
