import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    comments: [{
        text: String,
        postedBy: String
    }],
    likes: [{
        type: ObjectId,
        ref: "Users"
    }],
    author: {
        type: ObjectId,
        ref: "Users"
    },
    country: {
        type: String,
        required: true
    }
});

model("Posts", postSchema);