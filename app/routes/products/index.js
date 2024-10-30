import express from 'express';
import createProduct from './createProduct';

const router = express.Router();

router.post('/create-product', createProduct);


export default router;