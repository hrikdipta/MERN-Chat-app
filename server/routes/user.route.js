import express from 'express';
import {verifyUser} from '../utils/verifyUser.js'
import {updateUser} from '../controllers/user.controller.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User route');
});

router.post('/updateuser/:userid',verifyUser,updateUser)
export default router;