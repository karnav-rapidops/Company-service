const express = require('express');
const route = express.Router();
const controllers = require('./controller'); 

initCompanyRoutes();

function initCompanyRoutes()
{
    route.get('/company', (req, res)=>{
        controllers.company.GetAllCompanyAction(req, res);
    })
    route.get('/company/byname/:name', (req, res)=>{
        controllers.company.getCompanyIdByNameAction(req, res);
    })
    route.get('/company/:id', (req, res)=>{
        controllers.company.getCompanyByIdAction(req, res);
    })
    route.post('/company', (req, res)=>{
        controllers.company.insertCompanyAction(req, res);
    })
    route.patch('/company/:id', (req, res)=>{
        controllers.company.updateCompanyAction(req, res);
    })
    route.put('/company/:id', (req, res)=>{
        controllers.company.updateCompanyAction(req, res);
    })
    
    route.delete('/company/:id', (req, res)=>{
        controllers.company.deleteCompanyAction(req, res);
    })
}


module.exports = route