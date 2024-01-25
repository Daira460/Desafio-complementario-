import mongoose from 'mongoose'

const messagesCollection = 'messages'
const messagesSchema = new mongoose.Schema({
    user: {
        type: String,
        unique: true,
    },
    message: String,
    createdAt: Date,
    updatedAt: Date,
})

export const messagesModel = mongoose.model(messagesCollection, messagesSchema)


module.exports = Message