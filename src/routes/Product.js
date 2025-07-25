import e from 'express'
import { AddProduct, GetProduct, Upload } from '../services/product.js'

export const product_router = e.Router()

product_router.get('/get', GetProduct)

product_router.post('/add', Upload.single('image'), AddProduct)