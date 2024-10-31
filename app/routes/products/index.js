import express from 'express';
import createProduct from './createProduct/index.js';

const productRoutes = express.Router();

productRoutes.post('/create-product', createProduct);


export default productRoutes;