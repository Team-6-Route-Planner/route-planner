const router = require("express").Router();
const tripRoutes = require("./tripRoutes");
const routeRoutes = require("./routeRoutes");

router.use("/trips", tripRoutes);
router.use("/routes", routeRoutes);

module.exports = router;
