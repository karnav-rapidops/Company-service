module.exports = function makeGetCompanyIdByNameAction({
    getCompanyIdByName,
    Joi,
})
{
    return async function getCompanyIdByNameAction(req, res)
    {    
        try 
        {
            let name = req.params.name;
                        
            const { error } = validateCompanyIdByNameAction({ name })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
            
            let companyId = await getCompanyIdByName({ name });
            
            res.status(200).send(companyId);  
        }   
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        } 
    }
    function validateCompanyIdByNameAction({ name })
    {
        const schema = Joi.object({
            name: Joi.string().min(1).max(20).required(),
        })
        return schema.validate({ name })
    }
}