import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IAdmin extends Document {
    _id: string
    name: string
    phone_number: number
    password: string
    type: string
}

const AdminSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String
    },
    phone_number: {
        type: Number,
        required: true
    },
    password: {
        type: String
    },
    type: {
        type: String,
        enum: ['admin', 'super_admin'],
        default: 'admin'
    }
})

export default mongoose.model<IAdmin>('Admin', AdminSchema)
