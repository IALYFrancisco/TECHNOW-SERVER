import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    category: { type: String, required: true},
    mark: { type:String, required: true},
    model: { type:String, required: true},
    price: { type:String, required:true },
    color: { type:String, required:true},
    description: { type:String, required:true},
    stock: { type:String, required: true},
    image_file_url: { type:String, required: true},
    add_date: { type: Date, required: true, default: Date.now }
})

export const Product = new mongoose.model('Products', productSchema)