const express = require('express');
const path = require('path');


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Adjust this to match your deployment requirements
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
