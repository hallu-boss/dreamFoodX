const { handleLoginUserReq } = require("../controllers/loginController");

const router = require("express").Router();

router.post("/", handleLoginUserReq);

module.exports = router;
