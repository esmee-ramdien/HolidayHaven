import express from 'express';
import './models/user';
import userRouter from './routes/user';
import { connect } from 'mongoose';

const app = express();

const PORT = 8080;
connect(process.env.DB_PASSWORD ?? '').then(a => {
    console.log('Connected')
}).catch(e => {
    console.log('Something went wng: ', e);
})


app.use(express.json());
app.use('/users', userRouter);



app.listen(PORT, () => {
    console.log('API is online');
})
