import e from 'express'
import { GetProduct } from '../services/product'

export const product_router = e.Router()

product_router.get('/get', GetProduct)