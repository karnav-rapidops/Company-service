const companyTable = 'company';

module.exports = function makeCompanyDbMethods({
    pool,
})
{
    return Object.freeze({
        insertCompany,
        updateCompanyName,
        deleteCompany,
        getCompanyById,
        getAllCompany,
        getCompanyByName,
        getCompanyIdByName,
        getCompanyEmailByCompanyName,
    })

    async function insertCompany({ cname, email, address, estyear, type })
    {
        let result = await pool.query(`INSERT INTO ${companyTable} (cname, email, address, estyear, type) VALUES ($1, $2, $3, $4, $5) RETURNING cid`, [cname, email, address, estyear, type]);

        return result.rows[0].cid;
    }
    async function updateCompanyName({ cid, cname })
    {
        let result = await pool.query(`UPDATE ${companyTable} SET cname = $1 WHERE cid = $2 RETURNING cid`, [cname, cid]);
        
        return result.rows[0].cid;
    }
    async function deleteCompany({ cid })
    {
        console.info("\nDELETE-COMPANY-DB-FUNCTION");
        console.info("companyid: ", cid);

        let result = await pool.query(`DELETE FROM ${companyTable} WHERE cid = $1 RETURNING cid`, [cid]);

        console.info("DELETE-COMPANY-DB-FUNCTION-RESULT: ", result.rows[0].cid);

        return result.rows[0].cid;
    }
    async function getCompanyById({ cid })
    {
        // console.info("\nGET-COMPANY-DB-FUNCTION");
        // console.info("cid: ", cid);

        let result = await pool.query(`SELECT * FROM ${companyTable} WHERE cid = $1`, [cid]);

        // console.info("GET-COMPANY-DB-FUNCTION-RESULT: ", result.rows[0]);

        return result.rows[0];
    }
    async function getAllCompany()
    {
        // console.info("\nGET-ALL-COMPANY-DB-FUNCTION");

        let result = await pool.query(`SELECT * FROM ${companyTable}`);

        // console.info("GET-ALL-COMPANY-DB-FUNCTION-RESULT: ", result.rows);  
        
        return result.rows;
    }
    async function getCompanyByName({ cname })
    {
        let result = await pool.query(`SELECT cname FROM ${companyTable} WHERE cname = $1`, [cname]);

        return result.rows.length;
    }
    async function getCompanyIdByName({ cname })
    {
        console.info("GET-COMPNAY-ID-BY-NAME-DB-FUNCTION");
        console.info("cname: ", cname);

        let result = await pool.query(`SELECT cid FROM company WHERE cname = $1`, [cname]);

        console.log("GET-COMPANY-ID-BY-NAME-DB-FUNCTION-RESULT", result.rows[0]);
        return result.rows;
    }
    async function getCompanyEmailByCompanyName({ cname })
    {
        let result = await pool.query(`SELECT email FROM ${companyTable} WHERE cname = $1`, [cname]);
        return result.rows[0].email;
    }
}