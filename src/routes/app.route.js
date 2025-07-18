import express from "express";
import { root } from "../controllers/productController.js";

export const router = express.Router()

router.get('/', root)