module.exports = function makeInsertCompanyAction({
    insertCompany,
    Joi,
})
{
    return async function insertCompanyAction(req, res)
    {
        try 
        {
            let cname = req.body.cname;
            let email = req.body.email;
            let address = req.body.address;
            let estyear = req.body.estyear;
            let type = req.body.type;

            const {error} = validateInsertCompanyAction({ cname, address, estyear, type })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
                
            let companyid = await insertCompany({ cname, email, address, estyear, type });

            res.status(201).send(companyid);  
        }
        catch(err) {
            console.error(err);
            res.send(err.message);
        }   
    }
    function validateInsertCompanyAction({ cname, address, estyear, type })
    {
        const schema = Joi.object({
            cname: Joi.string().min(1).max(15).required(),
            address: Joi.string().min(1).max(50).required(),
            estyear: Joi.string().min(4).max(4).required(),
            type: Joi.string(),
        })
        return schema.validate({ cname, address, estyear, type })
    }
}