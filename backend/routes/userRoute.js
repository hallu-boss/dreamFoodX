const { handleGetUsers } = require("../controllers/userController");

const router = require("express").Router();

router.get("/", handleGetUsers);

module.exports = router;
