import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import { Shopify } from '@shopify/shopify-api';
import productRoutes from './app/routes/products/index.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'random-super-secret-string',
    resave: false,
    saveUninitialized: true,
}));
  

Shopify.Context.initialize({
    API_KEY: process.env.SHOPIFY_API_KEY,
    API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
    SCOPES: process.env.SCOPES.split(','),
    HOST_NAME: process.env.HOST.replace(/https?:\/\//, ''), // thiếu host
    API_VERSION: '2024-10',
    IS_EMBEDDED_APP: true,
  });


app.use('/api/v1', productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});