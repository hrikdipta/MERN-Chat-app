import express from 'express';
import {verifyUser} from '../utils/verifyUser.js'
import {updateUser,getUsers} from '../controllers/user.controller.js'
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User route');
});

router.post('/updateuser/:userid',verifyUser,updateUser)
router.get('/getusers',verifyUser,getUsers)
export default router;