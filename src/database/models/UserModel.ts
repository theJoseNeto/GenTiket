import { model } from 'mongoose';
import UserSchema from '../schemas/UserSchema';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const UserModel = model('User', UserSchema);


interface BodyObject {
    useremail: string,
    password: string,
    fullname: string
}

class AccessControl {

    body: BodyObject;
    user: BodyObject;
    errors: string[];

    constructor(body: any) {
        this.body = body;
        this.user = this.body;
        this.errors = [];
     }

    userExists = async (): Promise<void> => {
        this.user = await UserModel.findOne({ useremail: this.body.useremail});
        if (this.user) return;
        this.errors.push("Usuário não existe.");

        }

    emailValidation = (): void => {
        let emailValid = validator.isEmail(this.body.useremail);
        if (!emailValid) this.errors.push('Esse email não é válido');
        return;
    }

    encryptPassword = () => {
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);
    }


}

export class Register extends AccessControl {
    
    register = async () => {
        this.userExists();
        this.emailValidation();
        this.encryptPassword();
        
        if (this.errors.length > 0) return;

        this.user = await UserModel.create(this.body);
        
    }
}

export class Login extends AccessControl {
    
    accessAccount = async () => {
        this.emailValidation();
        await this.userExists();
        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            return;
        
        };
     
    }
}
