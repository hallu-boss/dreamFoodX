const { handleRegisterUserReq } = require("../controllers/registerController");

const router = require("express").Router();

router.post("/", handleRegisterUserReq);

module.exports = router;
