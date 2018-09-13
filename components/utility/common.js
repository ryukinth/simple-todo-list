module.exports = {
  responseJson: function(error, req, res, code, responseBody) {
    return new Promise(async (resolve) => {
      if (error) {
        console.error({result: false, message: error.message, stack: error.stack, debug: responseBody});
        res.status(code).json({result: false, message: error.message});
        resolve();
      } else {
        // console.debug(responseBody);
        res.status(code).json(responseBody);
        resolve();
      }
    });
  },
  validateDataType: function(variable, dataType, variableName) {
    return new Promise(async (resolve, reject) => {
      if (typeof variable === dataType) {
        resolve();
      } else {
        reject(new Error(variableName + ' is epected to be \''+ dataType +'\' but this variable is \'' + typeof variable + '\''));
      }
    });
  },
  validateUndefined: function(variable, variableName) {
    return new Promise((resolve, reject) => {
      if (variable !== undefined) {
          resolve(variable);
      } else {
        reject(new Error(variableName + ' is undefined.'));
      }
    });
  },
}