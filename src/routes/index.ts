require("dotenv").config();
const { Router } = require("express");
const router = Router();
import users from "./users.routes";
import signupToken from './signupToken.routes'
import tasks from './tasks.routes'

router.use('/login', users)
router.use('/auth', signupToken)
router.use('/tasks', tasks)

export default router;
