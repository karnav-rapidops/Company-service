module.exports = function makeGetCompanyIdByNameAction({
    getCompanyIdByName,
    Joi,
})
{
    return async function getCompanyIdByNameAction(req, res)
    {    
        try 
        {
            let cname = req.params.cname;

            const {error} = validateCompanyIdByNameAction({ cname })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
                

            console.info('\nGET-COMPANY-ID-BY-NAME-CONTROLLER');
            console.info("company name: ", cname);

            let companyid = await getCompanyIdByName({ cname });
            
            // console.info('GET-COMPANY-BY-ID-CONTROLLER-RESULT: ', companyDetails);

            res.status(200).send(companyid);  
        }   
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        } 
    }
    function validateCompanyIdByNameAction({ cname })
    {
        const schema = Joi.object({
            cname: Joi.string().min(1).max(20).required(),
        })
        return schema.validate({ cname })
    }
}