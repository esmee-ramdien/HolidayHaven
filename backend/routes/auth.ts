import express from 'express';
import { model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = model('Users');
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ username });

    if (existingUser) {
        return res.send({ message: 'Username already exists.', stat: 409 });
    }

    const user = new User({
        username,
        firstName,
        lastName,
        password: hashedPassword
    });

    await user.save();

    res.send({ message: 'User registered successfully', stat: 201 });
});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.send({ message: "Username not found.", stat: 404 });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.send({ message: 'Incorrect password.', stat: 401 });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET ?? '', {
            expiresIn: '2h'
        });

        res.send({ token, message: "Logged in successfully.", stat: 200 });
    } catch (error) {
        res.send({ error: 'Login failed due to server error.' });
    }
});

export default router;
