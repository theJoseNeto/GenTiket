import { Response } from 'express';
import qr from 'qr-image';
import {PassGen} from '../services/passworGenerator';

class QRcodeGen {
    
    genQRcode(res: Response) {
        const pass = new PassGen().passwordGen();
        const qrcode = qr.image("https://thejoseneto.github.io/", { type: "svg" });
        res.type('svg');
        qrcode.pipe(res);
    }
}

export default QRcodeGen;

