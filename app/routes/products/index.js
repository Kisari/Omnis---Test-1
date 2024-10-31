import express from 'express';
import createProduct from './createProduct/index.js';

const productRoutes = (shopify) =>{
    const router = express.Router();

    router.post('/create-product', (req, res) => createProduct(req, res, shopify));
    

    return router;
}

export default productRoutes;