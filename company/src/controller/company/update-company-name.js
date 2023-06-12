module.exports = function makeUpdateCompanyNameAction({
    updateCompanyName,
    Joi,
})
{
    return async function updateCompanyNameAction(req, res)
    {
        try
        {
            let cid = req.params.id;
            let cname = req.body.cname;

            const { error } = validateUpdateCompanyAction({ cid, cname })

            if(error)
                return res.status(400).send({"validation error": error.details[0].message})

            // console.info("\nUPDATE-COMPANY-NAME-CONTROLER")
            // console.info("cid: ", cid);
            // console.info("company name: ", cname);

            let companyid = await updateCompanyName({ cid, cname });

            // console.info("UPDATE-COMPANY-NAME-CONTROLER-RESULT: ", companyid);

            res.status(200).send(companyid);
        }
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        }
    }
    function validateUpdateCompanyAction({ cid, cname })
    {
        const schema = Joi.object({
            cid: Joi.string().required(),
            cname: Joi.string().min(1).max(15).required(),
            
        })
        return schema.validate({ cid, cname })
    }
}