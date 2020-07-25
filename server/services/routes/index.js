const router = require("express").Router();
const tripRoutes = require("./tripRoutes");
const routeRoutes = require("./routeRoutes");
const userRoutes = require("./userRoutes");

router.use("/", userRoutes);
router.use("/trips", tripRoutes);
router.use("/routes", routeRoutes);

module.exports = router;
