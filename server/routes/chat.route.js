import express from 'express';
import {verifyUser} from '../utils/verifyUser.js'
import {createChat,getChats,createGroupChat} from '../controllers/chat.controller.js'
const router = express.Router();

router.post('/createchat',verifyUser,createChat);
router.get('/',verifyUser,getChats);
router.post('/creategroupchat',verifyUser,createGroupChat);
// router.post('/addUserToGroup',verifyUser,addUserToGroup);
// router.post('/removeUserFromGroup',verifyUser,removeUserFromGroup);
// router.post('/renameGroup',verifyUser,renameGroup);
export default router;

