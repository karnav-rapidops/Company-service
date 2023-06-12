module.exports = function makeGetCompanyByIdAction({
    getCompanyById,
    Joi,
})
{
    return async function getCompanyByIdAction(req, res)
    {    
        try 
        {
            let cid = req.params.id;

            const {error} = validateGetCompanyByIdAction({ cid })
            if(error)
                return res.status(400).send({"validation error": error.details[0].message})
                
            // console.info('\nGET-COMPANY-BY-ID-CONTROLLER');
            // console.info("company id: ", cid);

            let companyDetails = await getCompanyById({ cid });
            
            // console.info('GET-COMPANY-BY-ID-CONTROLLER-RESULT: ', companyDetails);

            res.status(200).send(companyDetails);  
        }   
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        } 
    }
    function validateGetCompanyByIdAction({ cid })
    {
        const schema = Joi.object({
            cid: Joi.string().required(),
        })
        return schema.validate({ cid })
    }
}