const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./data/database');
const app = express();
const port = process.env.PORT || 3500;
const indexRoute = require('./routes')

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

// Initial routing
app.use('/',indexRoute);

/* ***********************
* Express Error Handler
* Place after all other middleware
*************************/
app.use(async (err, req, res, next) => {
    message = `Oh no! There was a crash. Maybe try a different route? ${err.status} - ${err.message} `
    res.send(message);
    console.error(message)
});



//DB validation
mongodb.intDb((err) => {
if (err){
    console.log(err);
    
}else{
    app.listen(port, () => {console.log(`Database is listening and node running on port ${port}`)});
}
});



