import { Router } from "express";
import PassGen from "../services/senha";


const router = Router();

router.get('/password', (req, res) => {
    const pass = new PassGen().passwordGen();
    res.json(pass);
});

export default router;