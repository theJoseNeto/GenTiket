import { Request, Response } from 'express';
import { Register } from '../database/models/UserModel';

export const registerNewUser = async (req: Request, res: Response) => {

    const user = new Register(req.body);
    await user.register().then(() => {
        
        user.errors.length > 0 ? res.json({errors: user.errors}) : res.json({ registred: true });
    })

}

