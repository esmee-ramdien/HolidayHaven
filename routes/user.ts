import express from 'express';
import { model } from 'mongoose';

const User = model('Users');

const router = express.Router();

router.post('/signup', (req, res) => {
    const { username, password, name } = req.body;
    
    if (username === '' || password === '' || name === '' ) {
        res.send("Username, name or pw not valid.");
        return;
    }

    const user = new User({
        name,
        username,
        password,
    })

    user.save();

    res.json({
        message: "User successfully saved"
    })
});

export default router;
