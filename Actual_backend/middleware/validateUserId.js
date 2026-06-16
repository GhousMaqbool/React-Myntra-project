const { sendError } = require("../utils/apiResponse");

const requireUserId = (req, res, next) => {
  const userId = req.headers["x-user-id"] || req.body.userId || req.query.userId;

  if (!userId || typeof userId !== "string" || !userId.trim()) {
    return sendError(res, 400, "User ID is required. Send x-user-id header.");
  }

  req.userId = userId.trim();
  next();
};

module.exports = { requireUserId };
