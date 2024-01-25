import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productsCollection = 'product';
const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    code: {
        type: String,
        unique: true,
    },
    price: Number,
    status: {
        type: Boolean,
        default: true,
    },
    available: {
        type: Boolean,
        default: true,
    },
    stock: Number,
    category: String,
    thumbnail: String,
    createdAt: Date,
    updatedAt: Date,
});

productSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productSchema);
