import e from 'express'
import { GetProduct } from '../services/product.js'

export const product_router = e.Router()

product_router.get('/get', GetProduct)

product_router.post('/add', addProduct)