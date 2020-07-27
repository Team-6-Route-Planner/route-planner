const router = require("express").Router();
const Controller = require("../controllers/userController");

router.post("/register", Controller.register);
router.post("/login", Controller.login);

router.get("/availables", Controller.listAvailable);
router.get("/all", Controller.listAllUser);
router.get("/:userId", Controller.listOne);
router.put("/:id", Controller.upLocation);

module.exports = router;
