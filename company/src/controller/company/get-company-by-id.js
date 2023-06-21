module.exports = function makeGetCompanyByIdAction({
    getCompanyById,
    Joi,
})
{
    return async function getCompanyByIdAction(req, res)
    {    
        try 
        {
            let id = req.params.id;

            const {error} = validateGetCompanyByIdAction({ id })
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let companyDetails = await getCompanyById({ id });
            
            res.status(200).send(companyDetails);  
        }   
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        } 
    }
    function validateGetCompanyByIdAction({ id })
    {
        const schema = Joi.object({
            id: Joi.string().required(),
        })
        return schema.validate({ id })
    }
}