module.exports = function makeGetAllCompanyAction({
    getAllCompany,
})
{
    return async function getAllCompanyAction(req, res)
    {      
        try
        {
            // console.info('\nGET-ALL-COMPANY-CONTROLLER');

            let companyList = await getAllCompany();
            
            // console.info('GET-ALL-COMPANY-CONTROLLER-RESULT: ', companyList);

            res.status(200).send(companyList); 
        }  
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        }
    }
}