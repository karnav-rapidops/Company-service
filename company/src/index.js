// Required express.js to create a server. Using port 3000 for company service
const express = require('express');
const app = express();
const port = 3000;
const router = require('./rest-service')

app.use(express.json());
app.use('/', router);

app.listen(port, ()=>{
    console.log(`company service running on port ${port}`);
})


