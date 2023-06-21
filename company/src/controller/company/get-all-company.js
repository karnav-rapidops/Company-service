module.exports = function makeGetAllCompanyAction({
    getAllCompany,
})
{
    return async function getAllCompanyAction(req, res)
    {      
        try
        {
            let companyList = await getAllCompany();
            
            res.status(200).send(companyList); 
        }  
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        }
    }
}