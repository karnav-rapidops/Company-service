module.exports = function makeGetAllCompany({
    getAllCompanyDb,
})
{
    return async function getAllCompnay()
    {
        return await getAllCompanyDb();
    }
}