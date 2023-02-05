import mongoose from 'mongoose';

const productsCollection = 'products';

const productsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    price: {
        type: String,
        require: true
    },
    thumbnail: {
        type: String
    }
},
{timestamps: true});

export const productsModel = mongoose.model(productsCollection, productsSchema);