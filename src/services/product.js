import { productsModel } from "../models/Product"

export async function GetProduct(request, response) {
    try {
        let product = await productsModel.find()
        response.status(200).json(product)
    }catch(err){
        response.status(500).json({error: err})
    }
}