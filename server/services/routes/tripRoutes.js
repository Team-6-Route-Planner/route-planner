const router = require("express").Router();
const Controller = require("../controllers/tripController");

router.post("/", Controller.add);
router.get("/", Controller.list);
router.get("/:userId/current", Controller.listOneCurrent);
router.get("/:userId/history", Controller.showHistory);
router.get("/:tripId", Controller.getTripById);
router.put("/:id", Controller.edit);

module.exports = router;
