import '../plugins/mongoosePlugins'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (_doc, ret) => {
                ret.id = ret._id.toString()
                delete ret._id
                delete ret.__v
                return ret
            },
        },
    }
)

export const User = mongoose.model('User', userSchema)
