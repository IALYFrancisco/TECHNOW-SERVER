import multer, { memoryStorage } from "multer"
import { Product } from "../models/Product.js"
import { connection, disconnection } from "./db.js"
import sharp from "sharp"

const storage = memoryStorage()

function fileFilter(request, file, cb){
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg']
    if(allowedTypes.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(new Error("File type not allowed."), false)
    }
}

export const Upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 15 * 1024 * 1024 }
})

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
        if(!request.file) return response.status(400).json("No product image provided.")
        await connection()
        let newProduct = Product(request.body)
        newProduct.image = `uploads/products/${fileName}`
        let result = await newProduct.save()
        if(result){
            let fileName = `${Date.now()}-${Math.round(Math.random()*1E9)}.jpeg`
            let output = `./src/public/uploads/images/products/${fileName}`
            await sharp(request.file.buffer).jpeg({ quality: 60 }).toFile(output)
        }
        response.status(201).json({
            message: "Product added successfully.",
            image: `${process.env.APP_ADDRESS}/uploads/images/products/${fileName}`
        })
    }catch(err){
        response.status(500).json({
            message: "Error adding new product, maybe error server.",
            error: err
    })
    }finally{
        await disconnection()
    }
}