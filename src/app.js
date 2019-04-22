const app = require('express')();
const config = require('config-yml');
const bodyParser = require('body-parser');

const controller = require('./controller');

const port = process.env.PORT || config.server.port || 8080;


app.listen(port, () => console.log(`Server listening on: ${port}`));

app.use(bodyParser.json());

// Only functional end-point of the server.
app.post('/',
    [
        controller.validateBody,
        controller.processRequest
    ]
);

// Any other requests will be responded with HTTP 404 
app.use((req, res) => {
    let response = config.responses.notFound;
    res.status(404).json(response);
});

// Handle any unexpected errors
app.use((err, req, res, next) => {
    console.error(err);
    let response = config.responses.internalError;
    res.status(500).json(response);
});