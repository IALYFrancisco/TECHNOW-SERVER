import { productsModel } from '../models/product.model.js'
import { dbConnection } from '../services/dbConnection.js'

export function root(request,response) {
    response.json("Welcome to TECHNOW server 🖐")
}

export async function addProduct(request, response){

    dbConnection()

    let productCollection = new productsModel(request.body)

    await productCollection.save()

    response.status(201).json("Product added successfuly ✅✅")

}