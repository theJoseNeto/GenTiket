import { Request, Response } from "express"
import { Login } from '../database/models/UserModel';

export const login = async (req: Request, res: Response) => {

    try {
        const user = new Login(req.body);
        user.accessAccount();

        if (user.errors.length > 0) return res.redirect('/invalid');
        
        return res.send('logado')

    } catch (e) {
        console.error(e)
    }
 }