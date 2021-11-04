import { model } from 'mongoose';
import UserSchema from '../schemas/UserSchema';
import validator from 'validator';
import bcryptjs from 'bcryptjs';

const UserModel = model('User', UserSchema);

interface BodyObject {
    useremail: string,
    password: string,
    fullname: string,
    user: null | object

}

class AccessControl {

    body: BodyObject;
    user: any;
    errors: string[];

    constructor(body: any) {
        this.body = body;
        this.user = null;
        this.errors = [];
    }

    userExists = async (): Promise<void> => {
        this.user = await UserModel.findOne({ useremail: this.body.useremail });
        if (!this.user) this.errors.push("Usuário não existe.");
        return;
    }

    userAlreadyExist = async (): Promise<void> => {

        this.user = await UserModel.findOne({ useremail: this.body.useremail });
        if (this.user) this.errors.push('Este usuário já está cadastrado.');
        return;
    }


    emailValidation = (): void => {
        const { useremail } = this.body;
        let emailValid = validator.isEmail(useremail);
        if (!emailValid) this.errors.push('Esse email não é válido');
        return;
    }

    encryptPassword = () => {
        const { password } = this.body;
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(password, salt);
    }

}

export class Register extends AccessControl {

    register = async () => {
        this.userAlreadyExist();
        this.emailValidation();
        this.encryptPassword();

        if (this.errors.length === 0) this.user = await UserModel.create(this.body);
        return;
    }
}

export class Login extends AccessControl {

    accessAccount = async () => {

        this.emailValidation();
        await this.userExists();
        if (this.errors.length > 0) return;

        if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
            this.errors.push('Senha inválida');
            this.user = null;
            return;

        };

    }
}
