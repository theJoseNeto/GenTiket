import 'dotenv/config';
import express from 'express';
import router from './routes/index.routes';
import mongoose from 'mongoose';
const app = express();
const port = 3333;

const MONGO_CONNECTION = process.env.MONGO_CONNECTION;
const connectionString = String(MONGO_CONNECTION);

mongoose.connect(connectionString).then(() => {
    app.emit('ok');
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

app.on('ok', () => {
    app.listen(port)
    console.log('connected');
});
