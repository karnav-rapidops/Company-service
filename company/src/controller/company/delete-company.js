module.exports = function makeDeleteCompanyAction({
    deleteCompany,
    Joi,
})
{
    return async function deleteCompanyAction(req, res)
    {        
        try
        {
            let cid = req.params.id;
        
            console.info('\nDELETE-COMPANY-CONTROLLER');
            console.info("company id: ", cid);

            const { error } = validateDeleteCompanyAction({ cid })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            let deletedCompanyId = await deleteCompany({ cid });
            // 
            // console.info('DELETE-COMPANY-CONTROLLER-RESULT: ', deletedCompanyId);

            res.status(200).send(deletedCompanyId);  
        }
        catch(err)
        {
            // console.error(err);
            res.send(err.message);
        }
    }
    function validateDeleteCompanyAction({ cid })
    {
        const schema = Joi.object({
            cid: Joi.string().required(),
        })
        return schema.validate({ cid })
    }
}
