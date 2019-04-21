const config = require('config-yml');

const apiParameters = config.parameters;

// Check if the required parameters exist in payload.
const checkRequiredParams = (body) => {

    if (!body) {
        return {
            isValid: false
        };
    }

    let isValid = true;
    let missingParams = [];

    let requiredParams = apiParameters.filter(param => param.required == true);

    requiredParams.forEach((requiredParam) => {
        let requiredParamName = requiredParam.name;
        let bodyParam = body[requiredParamName];

        if (bodyParam == null) {
            missingParams.push(requiredParamName);
            isValid = false; 
        }
    });

    return {
        isValid,
        missingParams
    };
};

// Validate parameters by their types defined in config.
const validateParams = (body) => {

    let isValid = true;
    let message;

    for (let idx in apiParameters) {

        let apiParam = apiParameters[idx];
        let paramName = apiParam.name;
        let paramType = apiParam.type;
        let paramDefault = apiParam.default;
        let bodyParam = body[paramName];

        if (paramType === 'Date') {
            try {
                if (!Date.parse(bodyParam)) {
                    throw Error(`not supported date format: ${bodyParam}`);
                }
            } catch (e) {
                console.log(e && e.message);
                isValid = false;
                message = `${paramName} should be in a date format (YYYY-MM-DD)`;
                break;
            }
        }

        if (paramType === 'Integer') {
            try {
                // + operator used to convert any string value to numeric (including decimals).
                // paramDefault is the default value of the parameter defined in config.
                let value = +(bodyParam || paramDefault);
                if (!Number.isInteger(value)) {
                    throw Error(`not supported integer: ${bodyParam}`);
                } else {
                    body[paramName] = value;
                }
            } catch (e) {
                console.log(e && e.message);
                isValid = false;
                message = `${paramName} should be an integer`;
                break;
            }
        }
    }

    return {
        isValid,
        message
    };
};

// Combine required parameters check and validation if neccessary.
const validate = (body) => {
    let requiredParamsCheck = checkRequiredParams(body);
    return requiredParamsCheck.isValid ? validateParams(body) : requiredParamsCheck;
};

module.exports = {
    validate
};