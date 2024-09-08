import express from "express";
import { addProduct, root } from "../controllers/productController.js";

export const router = express.Router()

router.get('/', root)

router.post('/product', addProduct)