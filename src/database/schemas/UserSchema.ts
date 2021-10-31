import { Schema } from 'mongoose';

const UserSchema = new Schema({
    useremail: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String, required: true },
});

export default UserSchema;
