import mongoose, { mongo, Schema } from "mongoose";

const productSchema = new Schema({
    categorie: { type: String, required: true},
    mark: { type:String, required: true},
    model: { type:String, required: true},
    price: { type:String, required:true },
    color: { type:String, required:true},
    description: { type:String, required:true},
    stock: { type:String, required: true},
    image_file_url: { type:String, required: true}
})

export const productsModel = new mongoose.model('Products', productSchema)