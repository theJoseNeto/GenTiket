import { Request, Response } from 'express';
import { Register } from '../database/models/UserModel';

export const registerNewUser = async (req: Request, res: Response) => {
    try {
       
        const user = new Register(req.body);
        await user.register()
            .then(() => {
            res.send('Novo usuário criado :) ');
            })
    
    } catch (e) { 
        res.json({ err: e });
    }
    
}