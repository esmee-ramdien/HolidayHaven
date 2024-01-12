import express from 'express';
import { model } from 'mongoose';
import bcrypt from 'bcryptjs';

const User = model('Users');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    if (await User.findOne({ username })) {
        res.send({
            message: "Username already taken."
        });
    } else {

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            username,
            firstName,
            lastName,
            password: hashedPassword
        });

        await user.save();

        return res.send({
            message: "User successfully saved."
        });
    }
}
);

router.post('/login', async (req, res) => {
    const { username, password } = req.body;


    const user = await User.findOne({ username });

    if (!user) {
        console.log(username + " does not exist.");
        return res.send({
            message: "User not found."
        });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
        console.log(password, user.password);
    }

    console.log(user.firstName + " is in the database.");
    res.send({
        message: "User found."
    });

});

router.get('/profile/:username', async (req, res) => {

    const user = await User.findOne({ username: req.params.username });

    if (user) {
        console.log(`Profile of ${user.firstName} is found.`);
        res.json({ firstName: user.firstName, lastName: user.lastName });
    } else {
        console.log('Profile not found');
    }

});

export default router;
