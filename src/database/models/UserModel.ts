import { model } from 'mongoose';
import UserSchema from '../schemas/UserSchema';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const UserModel = model('User', UserSchema);


interface BodyObject {
    email: string,
    password: string,
    fullname: string
}

class AccessControl {

    body: BodyObject;
    user?: any;
    errors: string[];

    constructor(body: any) {
        this.body = body;
        this.user = null;
        this.errors = [];
     }

    userExists = async () => {
        this.user = await UserModel.findOne({ email: this.body.email });
        if (!this.user) this.errors.push("Usuário não existe.");
        return;

        }

    emailValidation = (email: string): void => {

        let emailValid = validator.isEmail(email);
        if (!emailValid) this.errors.push('Esse email não é válido');
        return;

    }

    encryptPassword = (password: string): void => {
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(password, salt);
        return;
    }

   

}

export class Register extends AccessControl {
    

    register = async () => {
        await this.userExists();
        await this.emailValidation(this.body.email);
        await this.encryptPassword(this.body.password);
        
        if (this.errors.length > 0) return;

        this.user = UserModel.create(this.body);
        
    }

    
 
}

export class Login extends AccessControl {
    
    accessAccount = () => {
        this.userExists()
        this.emailValidation(this.body.email);
        
        if (this.errors.length > 0) return;
        
        if(!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;
        }

        
     };
    
   

     
 }
