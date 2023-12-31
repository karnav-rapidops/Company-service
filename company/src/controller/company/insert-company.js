module.exports = function makeInsertCompanyAction({
    insertCompany,
    Joi,
})
{
    return async function insertCompanyAction(req, res)
    {
        try 
        {
            let name = req.body.name;
            let email = req.body.email;
            let address = req.body.address;
            let estYear = req.body.estYear;
            let type = req.body.type;

            validateInput({ name, address, estYear, type, res })
                
            let companyId = await insertCompany({ name, email, address, estYear, type });

            res.status(201).send(companyId);  
        }
        catch(err) {
            console.error(err);
            res.send(err.message);
        }   
    }
    function validateInput({ name, address, estYear, type, res })
    {
        const schema = Joi.object({ 
            name: Joi.string().min(1).max(15).required(),
            address: Joi.string().min(1).max(50).required(),
            estYear: Joi.string().min(4).max(4).required(),
            type: Joi.string(),
        })
        const { error } = schema.validate({ name, address, estYear, type })

        if(error)
            return res.status(400).send({"validation error": error.details[0].message})
    }
}