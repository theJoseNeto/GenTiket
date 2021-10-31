import { Router } from "express";
import QRcodeGen from '../services/qrCodeGenerator';
import {registerNewUser}  from '../controllers/registerController';
import {login}  from '../controllers/loginController';

const router = Router();
const qrcode = new QRcodeGen();

router.get('/invalid', (req, res) => res.send('invalid user'));

router.get('/qrcode', (req, res) => {
    qrcode.genQRcode(res);
});

router.post('/register', registerNewUser);
router.post('/login', login)


export default router;