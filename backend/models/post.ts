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
    comments: [{
        text: String,
        postedBy: {
            type: ObjectId,
            ref: "Users"
        }
    }],
    likes: [{
        type: ObjectId,
        ref: "Users"
    }],
    author: {
        type: ObjectId,
        ref: "Users"
    }
});

model("Posts", postSchema);