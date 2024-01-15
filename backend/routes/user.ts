import express from 'express';
import { model } from 'mongoose';
import authenticated from '../middleware/authentication'

const User = model('Users');

const router = express.Router();

router.get('/profile/:username', authenticated, async (req, res) => {

    const user = await User.findOne({ username: req.params.username });

    if (user) {
        console.log(`${user.username} found`);
        res.json({ firstName: user.firstName, lastName: user.lastName });
    } else {
        console.log('Profile not found');
    }

});

router.get('/profiles', authenticated, async (req, res) => {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.json({ users });

});

router.get('/loggedIn', authenticated, async (req, res) => {
    const user = await User.findById({ _id: req.user._id });

    res.json({ username: user.username });
})

export default router;
