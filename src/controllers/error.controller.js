exports.errorHandle = function (err, req, res, next) {
  console.error(err);

  let customError = {
    statusCode: err.statusCode || 500,
    error: err.message,
  };

  res.status(customError.statusCode).send(customError);
};