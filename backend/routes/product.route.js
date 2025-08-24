import express from "express";
import { getProducts, updatedProducts, createProduct, deleteProduct } from "../controllers/product.controller.js";

const router = express.Router();

//GET
router.get('/', getProducts);

//POST
router.post('/', createProduct);

//PUT
router.put('/:id', updatedProducts);

//DELETE
router.delete('/:id', deleteProduct);


export default router;