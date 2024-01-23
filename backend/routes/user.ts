import express from 'express';
import { model } from 'mongoose';
import authenticated from '../middleware/authentication'

const User = model('Users');

const router = express.Router();

router.get('/profile/:username', authenticated, async (req, res) => {

    const user = await User.findOne({ username: req.params.username });

    if (user) {
        res.send({ firstName: user.firstName, lastName: user.lastName });
    } else {
        console.log('Profile not found');
    }

});

router.post('/commentAuth', authenticated, async (req, res) => {

    const user = await User.findOne({ _id: req.body.id });

    if (user) {
        res.send({ username: user.username});
    } else {
        res.send({message: "User not allowed to delete comment."})
    }

});

router.get('/profiles', authenticated, async (req, res) => {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");

    res.send({ users });

});

router.get('/loggedIn', authenticated, async (req, res) => {
    const user = await User.findById({ _id: req.user._id });
    
    if(!authenticated){
        console.log("not auth")
    }
    res.send({ _id: user._id, username: user.username });
})

export default router;
