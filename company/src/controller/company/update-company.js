module.exports = function makeUpdateCompnayAction({
    updateCompany,
})
{
    return async function updateCompnayAction(req, res)
    {      
        try
        {   
            const data = createDataBasedOnHttpMethod(req);

            let updatedId = await updateCompany({ data, httpMethod: req.method })

            res.status(200).send(updatedId);
        }  
        catch(err)
        {
            console.error(err);
            res.send(err.message);
        }
    }
    function createDataBasedOnHttpMethod(req)
    {
        // Get http method 
        const httpMethodForUpdate = req.method; 

        const data = {};

        // If http method is PUT then take all fields and create data object
        if(httpMethodForUpdate == 'PUT')
        {
            data.id = req.params.id;
            data.name = req.body.name;
            data.email = req.body.email;
            data.address = req.body.address;
            data.estYear = req.body.estYear;
            data.type = req.body.type;
        }
        // If http method is PATCH, then take field to update and newValue to create data object.
        else {
            data.id = req.params.id;
            data.fieldToUpdate  = req.body.fieldToUpdate;
            data.newValue = req.body.newValue;
        }

        return data;
    }
}