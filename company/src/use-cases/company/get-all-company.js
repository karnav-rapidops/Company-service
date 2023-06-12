module.exports = function makeGetAllCompany({
    getAllCompanyDb,
})
{
    return async function getAllCompnay()
    {
        console.info("\nGET-ALL-COMPANY-USECASE");

        let companyList = await getAllCompanyDb();

        console.info("GET-ALL-COMPANY-USECASE-RESULT: ", companyList);
        return companyList;
    }

}