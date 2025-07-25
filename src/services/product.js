import { memoryStorage } from "multer"
import { Product } from "../models/Product.js"
import { connection, disconnection } from "./db.js"

const storage = memoryStorage()

export async function GetProduct(request, response) {
    try {
        await connection()
        let product = await Product.find()
        response.status(200).json(product)
    }catch(err){
        response.status(500).json({error: err})
    }finally{
        await disconnection()
    }
}

export async function AddProduct(request, response) {
    try{
        await connection()
        let newProduct = Product(request.body)
        await newProduct.save()
        response.status(201).json("New product added.")
    }catch(err){
        response.status(500).json({
            message: "Error adding new product, maybe error server.",
            error: err
    })
    }finally{
        await disconnection()
    }
}