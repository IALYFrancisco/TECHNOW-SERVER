import express from "express";
import { root } from "../controllers/appAllController.js";

export const router = express.Router()

router.get('/', root)