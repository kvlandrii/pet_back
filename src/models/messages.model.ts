import mongoose from 'mongoose'

const messageSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        roomName: { type: String, required: true },
    },
    {
        timestamps: true,
        versionKey: false,
        id: true,
        toJSON: {
            transform(doc, ret) {
                ret.id = ret._id
                delete ret._id
            },
        },
    }
)

export const Messages = mongoose.model('Messages', messageSchema)
