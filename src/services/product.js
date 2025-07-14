import { Product } from "../models/Product.js"
import { connection, disconnection } from "./db.js"

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