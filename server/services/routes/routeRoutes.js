const router = require("express").Router();
const Controller = require("../controllers/routeController");

router.put("/:userId/:routeId", Controller.edit);

module.exports = router;
