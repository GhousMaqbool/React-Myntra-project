const express = require("express");
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const { requireUserId } = require("../middleware/validateUserId");

const router = express.Router();

router.use(requireUserId);

router.get("/", getWishlist);
router.post("/add", addToWishlist);
router.delete("/remove/:id", removeFromWishlist);

module.exports = router;
