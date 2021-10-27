import express from 'express';
import router from './routes/index.routes';

const app = express();
const port = 3333;

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(router);

app.listen(port);