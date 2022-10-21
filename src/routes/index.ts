require("dotenv").config();
const { Router } = require("express");
const router = Router();
import users from "./users.routes";

router.use('/users', users)

export default router;
