const { sendError } = require("../utils/apiResponse");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map((e) => e.message);
    return sendError(res, 400, "Validation failed", errors);
  }

  if (err.name === "CastError") {
    return sendError(res, 400, "Invalid ID format");
  }

  if (err.code === 11000) {
    return sendError(res, 409, "Duplicate entry detected");
  }

  return sendError(res, err.statusCode || 500, err.message || "Internal server error");
};

module.exports = errorHandler;
