import mongoose, { Schema, Document } from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

export interface IProduct extends Document {
    _id: string
    name: string
    description: {
        uzb:string,
        rus:string,
        eng:string
    },
    price: string
    images: string[]
    madeAt: number
}

const ProductSchema = new Schema({
    _id: {
        type: String,
        default: uuidv4
    },
    name: {
        type: String
    },
    description: {
        uzb:{type: String},
        rus:{type: String},
        eng:{type: String}
    },
    price: {
        type: String
    },
    images: [
        {
            type: String
        }
    ],
    madeAt: {
        type: Number,
        default: Date.now
    }
})

export default mongoose.model<IProduct>('Product', ProductSchema)
