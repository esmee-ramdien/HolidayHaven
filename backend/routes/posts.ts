import express from 'express';
import { model } from 'mongoose';
import authenticated from '../middleware/authentication'

const Post = model('Posts');
const User = model('Users');
const router = express.Router();


router.post('/createpost', authenticated, async (req, res) => {
    const { title, base64, caption, country } = req.body;

    if (!title || !base64 || !country) {
        return res.send({ message: "Please fill in all fields" });
    } else {

        const post = new Post({
            title,
            photo: base64,
            caption,
            author: req.user,
            country
        });

        await post.save();

        return res.send({
            message: "Post successfully saved."
        });
    }
})

router.post('/retrieveposts', authenticated, async (req, res) => {
    const requestedUser = await User.findOne({ username: req.body.username });
    const posts = await Post.find({ author: requestedUser }, { _id: 1, title: 1, photo: 1, likes: 1, comments: 1, author: 1, caption: 1, country: 1 });

    res.json({ posts });
})

router.post('/getpost', authenticated, async (req, res) => {
    const post = await Post.findById({ _id: req.body.id }, { _id: 1, title: 1, photo: 1, likes: 1, comments: 1, author: 1, caption: 1, country: 1 });

    res.send({ post });
})

router.put('/like', authenticated, async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.body._id, {
        $addToSet: {
            likes: req.user._id
        },
    }, { new: true });

    res.status(200).json({ message: "Like updated successfully", likes: post.likes });
})

router.put('/unlike', authenticated, async (req, res) => {
    const post = await Post.findByIdAndUpdate(req.body._id, {
        $pull: {
            likes: req.user._id
        },
    }, { new: true });

    res.status(200).json({ message: "Like removed successfully", likes: post.likes });
})


router.put('/comment', authenticated, async (req, res) => {
    const requestedUser = await User.findById({ _id: req.user._id });

    const post = await Post.findByIdAndUpdate(req.body._id, {
        $push: {
            comments: {
                text: req.body.comment,
                postedBy: requestedUser.username
            }
        },
    }, { new: true });

    res.status(200).json({ message: "comment placed ", comments: post.comments });
})

router.put('/delcomment', authenticated, async (req, res) => {

    const post = await Post.findByIdAndUpdate(req.body.postId, {
        $pull: {
            comments: { _id: req.body.commentId }
        },
    }, { new: true });

    res.status(200).json({ message: "Comment deleted ", comments: post.comments });
})

router.delete('/deletepost/:postId', authenticated, async (req, res) => {

    await Post.findOneAndDelete({ _id: req.params.postId, author: req.user._id })

    const posts = await Post.find({ author: req.user._id }, { _id: 1, title: 1, photo: 1, likes: 1, comments: 1, author: 1, caption: 1, country: 1 });
    res.json({ posts });
})


export default router;
