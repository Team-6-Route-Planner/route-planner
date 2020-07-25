const router = require("express").Router();
const Controller = require("../controllers/routeController");

router.put("/:id", Controller.edit);

module.exports = router;
