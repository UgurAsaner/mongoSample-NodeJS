const config = require('config-yml');

const validate = require('./validator').validate;
const getRecords = require('./dbHelper').getRecords; 

const apiResponses = config.responses;

// Validate the request parameters before executing the process.
const validateBody = (req, res, next) => {

    const validation = validate(req.body);
    let response;

    if (validation.isValid) {
        // Parameters validated request can be processed.
        next();

    } else if (validation.missingParams) {
        // Some parameter(s) are missing, so including missing ones in response.
        response = apiResponses.missingParams;    
        response.missing = validation.missingParams;
        res.json(response);

    } else if (validation.message) {
        // Some parameter is invalid, including the parameter with reason in response.
        response = apiResponses.invalidParam;
        response.message += `: ${validation.message}`;
        res.json(response);

    } else {
        // Unexpected condition throwing an error, express will handle the rest.
        throw Error('Unexpected condition in controller - validateBody');
    }
};


// Process the request by using validated parameters
const processRequest = (req, res) => {
    const params = req.body;
    getRecords(params)
        .then(
            (records) => {
                const response = apiResponses.success;
                response.records = records;
                res.json(response); 
            }
        )
        .catch(
            (error) => {
                // Respond with a generic error message, need to see logs for more details.
                const response = apiResponses.getRecordsFail; 
                res.json(response); 
                console.log(error);
            }
        );
};


module.exports = {
    validateBody,
    processRequest
};