import express from 'express';
import './models/user';
import './models/post'
import authRouter from './routes/auth'
import userRouter from './routes/user';
import postRouter from './routes/posts'
import { connect } from 'mongoose';
import cors from 'cors';
import { Document } from 'mongoose';


const app = express();
const PORT = 8080;

connect(process.env.DB_PASSWORD ?? '').then(a => {
    console.log('Successfully connected to the database.')
}).catch(e => {
    console.log('Something went wrong: ', e);
})

app.use(cors());
app.use(express.json({limit: '5mb'}));

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/auth', authRouter);


app.listen(PORT, () => {
    console.log('API is online');
})

//  Type Declarations

declare global {
    namespace Express {
        interface Request {
            user: UserDocument;
        }
    }
}

interface User {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}

interface UserDocument extends User, Document { }
