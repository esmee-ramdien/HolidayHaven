import express from 'express';
import './models/user';
import userRouter from './routes/user';
import { connect } from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = 8080;

connect(process.env.DB_PASSWORD ?? '').then(a => {
    console.log('Successfully connected to the database.')
}).catch(e => {
    console.log('Something went wrong: ', e);
})

app.use(cors());
app.use(express.json());

app.use('/user', userRouter);


app.listen(PORT, () => {
    console.log('API is online');
})

