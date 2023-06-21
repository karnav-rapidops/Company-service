const companyTable = 'company';

module.exports = function makeCompanyDbMethods({
    pool,
    databaseError,
})
{
    return Object.freeze({
        insertCompany,
        deleteCompany,
        getCompanyById,
        getAllCompany,
        getCompanyByName,
        getCompanyIdByName,
        getCompanyEmailByCompanyName,
        updateCompany,
        updateCompanyField,
    })

    async function insertCompany({ name, email, address, estYear, type })
    {
        try {
            const result = await pool.query(`INSERT INTO ${companyTable} (cname, email, address, estyear, type) VALUES ($1, $2, $3, $4, $5) RETURNING cid`, [name, email, address, estYear, type]);

            return result.rows[0].cid;   
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function deleteCompany({ id })
    {
        try {
            const result = await pool.query(`DELETE FROM ${companyTable} WHERE cid = $1 RETURNING cid`, [id]);

        return result.rows[0].cid;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function getCompanyById({ id })
    {
        try {
            const result = await pool.query(`SELECT * FROM ${companyTable} WHERE cid = $1`, [id]);

        return result.rows[0];
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function getAllCompany()
    {
        try {
            const result = await pool.query(`SELECT * FROM ${companyTable}`);
        
        return result.rows;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
    async function getCompanyByName({ name })
    {
        try {
            const result = await pool.query(`SELECT cname FROM ${companyTable} WHERE cname = $1`, [name]);

            return result.rows.length;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
       
    }
    async function getCompanyIdByName({ name })
    {
        try {
            const result = await pool.query(`SELECT cid FROM company WHERE cname = $1`, [name]);

        return result.rows[0].cid;
        } catch (error) {
            throw new databaseError('Error while quering!')   
        }
        
    }
    async function getCompanyEmailByCompanyName({ name })
    {
        try {
            const result = await pool.query(`SELECT email FROM ${companyTable} WHERE cname = $1`, [name]);
            return result.rows[0].email;
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
       
    }
    async function updateCompany({ id, name, email, address, estYear, type })
    {
        try {
            const result = await pool.query(`UPSERT INTO ${companyTable} (cid, cname, email, address, estyear, type) VALUES ($1, $2, $3, $4, $5, $6) RETURNING cid`, [id, name, email, address, estYear, type]);
        
            return result.rows[0].cid;
        } catch (error) {
            throw new databaseError('Error while quering!')   
        }
        
    }
    async function updateCompanyField({ id, fieldToUpdate, newValue })
    {
        try {
            const result = await pool.query(`UPDATE ${companyTable} SET ${fieldToUpdate} = $1 WHERE cid = $2 RETURNING cid`, [newValue, id]);
        return result.rows[0].cid; 
        } catch (error) {
            throw new databaseError('Error while quering!')
        }
        
    }
}