const router = require("express").Router();
const tripRoutes = require("./tripRoutes");
const routeRoutes = require("./routeRoutes");
const userRoutes = require("./userRoutes");

router.use("/trips", tripRoutes);
router.use("/routes", routeRoutes);
router.use("/", userRoutes);

module.exports = router;
