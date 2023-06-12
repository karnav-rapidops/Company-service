module.exports = function makeDeleteCompany({
    deleteCompanyDb,
    validationError,
    axios,
    Joi,
})
{
    return async function deleteCompany({ cid })
    {
        console.info("\nDELETE-COMPANY-USECASE");
        console.info("company id: ", cid);

        const {error} = validateDeleteCompany({ cid });
        if(error)
            throw new validationError(error.message);

        let companyid = await deleteCompanyDb({ cid });

        console.info("DELETE-COMPANY-USECASE-RESULT: ", companyid);
        
        await axios.delete(`http://localhost:3001/employee/company/${cid}`);
            
        // console.info("Axios result: ", axiosRes.data);

        return companyid;
    }
    function validateDeleteCompany({ cid })
    {
        const schema = Joi.object({
           cid: Joi.string().required(),
        })
        return schema.validate({ cid })
    }
}