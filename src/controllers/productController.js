import { productsModel } from '../models/Product.js'
import { disconnection } from '../services/db.js'

export function root(request,response) {
    response.json("Welcome to TECHNOW server 🖐")
}

export async function addProduct(request, response){

    await disconnection()

    let productCollection = new productsModel(request.body)

    await productCollection.save()

    response.status(201).json("Product added successfuly ✅✅")

}