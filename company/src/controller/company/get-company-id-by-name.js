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
            
            let companyId = await getCompanyIdByName({ name });
            
            res.status(200).send(companyId);  
        }   
        catch(err)
        {
            console.error(err);
            res.status(500).send(err.message);
        } 
    }
}