import express from 'express';
import { model } from 'mongoose';

const User = model('Users');

const router = express.Router();

router.post('/signup', async (req, res) => {
    const { username, password, firstName, lastName } = req.body;

    if (username === '' || password === '' || firstName === '' || lastName === '') {
        res.send("Please fill in all fields.");
        return;
    }
    if (await User.findOne({ username: req.body.username })) {
        res.send({
            message: "Username already taken."
        });
    } else {
        const user = new User({
            firstName,
            lastName,
            username,
            password,
        })

        user.save();

        res.send({
            message: "User successfully saved."
        })
    }
});

router.post('/login', async (req, res) => {
    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });

    if (!user) {
        console.log(req.body.username + " does not exist.");
        res.send({
            message: "User not found."
        });
    } else {
        console.log(user.firstName + " is in the database.");
        res.send({
            message: "User found."
        });
    }


});

router.get('/profile/:username', async (req, res) => {
    
    const user = await User.findOne({ username: req.params.username }).select("-password");
    
    if (user){
        console.log(`Profile of ${user.firstName} is found.`);
        res.json({firstName: user.firstName, lastName: user.lastName});
    } else{
        console.log('{Profile not found');
    }

});

export default router;
