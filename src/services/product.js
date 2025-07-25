import { memoryStorage } from "multer"
import { Product } from "../models/Product.js"
import { connection, disconnection } from "./db.js"

const storage = memoryStorage()

function fileFilter(request, file, cb){
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error("File type not allowed."), false)
    }
}

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