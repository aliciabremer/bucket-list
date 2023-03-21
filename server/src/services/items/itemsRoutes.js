const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth")
const itemsController = require("./itemsController")

router.post("/create", auth, itemsController.createNewItem);
router.post("/complete/:item_id", auth, itemsController.markCompleted);
router.post("/edit/:item_id", auth, itemsController.updateItem);
router.post("/delete/:item_id", auth, itemsController.deleteItem);
router.get("/items/:username", auth, itemsController.getItems);

module.exports = router;
