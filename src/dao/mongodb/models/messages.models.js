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

const Message = mongoose.model(messageCollections, messageSchema)

module.exports = Message