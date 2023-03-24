import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const messagesCollection = 'messages';

const messagesSchema = new mongoose.Schema({
    author: {
        type: Schema.Types.ObjectId, ref:"userSchema",
        require: true
    },
    message: {
        type: String,
        require: true
    }
});

export const messagesModel = mongoose.model(messagesCollection, messagesSchema);