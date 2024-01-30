//cart.models.js
import mongoose from 'mongoose'
const products = require ('./products.models')

const cartsCollection = 'cart'
const cartsSchema = new mongoose.Schema({
    products: {
        type:  [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'product',
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
    }, 
    status: {
        type: Boolean,
        default: true
    },
    createdAt: Date,
    updatedAt: Date,
})

cartsSchema.pre('find', function(){
    this.populate('products.product')
})

cartsSchema.pre('findOne', function(){
    this.populate('products.product')
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)


module.exports = Cart