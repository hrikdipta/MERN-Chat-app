import express from 'express';
import { signup,checkEmail ,login} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/signup', signup);
router.post('/checkemail',checkEmail);
router.post('/login',login);
export default router;