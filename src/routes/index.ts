require("dotenv").config();
const { Router } = require("express");
const router = Router();
import users from "./users.routes";
import signupToken from './signupToken.routes'

router.use('/login', users)
router.use('/auth', signupToken)

export default router;
