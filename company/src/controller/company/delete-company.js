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
        
            let deletedCompanyId = await deleteCompany({ id });

            res.status(200).send(deletedCompanyId);  
        }
        catch(err)
        {
            console.error(err);
            res.status(500).send(err.message);
        }
    }
}
