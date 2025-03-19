import mongoose, { Schema } from 'mongoose'

function toJSONPlugin(schema: Schema) {
    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {
            ret.id = ret._id.toString()
            delete ret._id
            return ret
        },
    })
}

mongoose.plugin(toJSONPlugin)
