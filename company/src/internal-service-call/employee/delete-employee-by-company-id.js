module.exports = function makeDeleteEmployeeByCompanyId({
    axios,
    Joi,
})
{
    return async function deleteEmployeeByCompanyId({ id })
    {
        await axios.delete(`http://localhost:3001/employee/company/${id}`);
        return;
    }
}