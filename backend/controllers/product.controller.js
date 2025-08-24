import Product from "../models/product.model.js";
import mongoose from "mongoose";

//GET
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}); //fetch all products from db
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error('Error in Get products:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

//POST
export const createProduct = async (req, res) => {
    const product = req.body; //user sends product data in request body

    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: 'Name, price, and image are required' });
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error('Error in Create product:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}

//PUT
export const updatedProducts = async (req, res) => {
    const { id } = req.params;
    const product = req.body; //user sends updated product data in request body   

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error('Error in Update product:', error.message);
        res.status(500).json({ success: false, message: 'Error 500: Error server' });
    }
}


//DELETE
export const deleteProduct = async (req, res) => {
    const { id } = req.params;
  //console.log('Deleting product with ID:', id); do test

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ success: false, message: 'Invalid product ID' });
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error in Delete product:', error.message);
        res.status(500).json({ success: false, message: 'Error 500: Error server' });
    }
}