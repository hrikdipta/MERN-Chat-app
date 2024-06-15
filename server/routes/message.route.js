import express from 'express';
import {getMessages,createMessage} from '../controllers/message.controller.js'
import {verifyUser} from '../utils/verifyUser.js'
const router = express.Router();

router.get('/:chatId',verifyUser,getMessages)
router.post('/',verifyUser,createMessage);

export default router;