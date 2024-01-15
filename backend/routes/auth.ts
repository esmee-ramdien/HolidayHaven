import express from 'express';
import { model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const User = model('Users');
const router = express.Router();

router.post('/signup', async (req, res) => {
    try {
        const { username, password, firstName, lastName } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            firstName,
            lastName,
            password: hashedPassword
        });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }

});

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed1' });

        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET ?? '', {
            expiresIn: '2h',
        });
        res.status(200).json({ token, message: "Logged in successfully." });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }


});

export default router;
