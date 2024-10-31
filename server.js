import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import '@shopify/shopify-api/adapters/node';
import { shopifyApi, LATEST_API_VERSION } from '@shopify/shopify-api';
import productRoutes from './app/routes/products/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();  // Load environment variables

const missing = [];
if (!process.env.SHOPIFY_API_KEY) missing.push('apiKey');
if (!process.env.SHOPIFY_API_SECRET) missing.push('apiSecretKey');
if (!process.env.HOST) missing.push('hostName');

if (missing.length > 0) {
    throw new Error(`Missing values for: ${missing.join(', ')}`);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(session({
    secret: process.env.SESSION_SECRET || 'random-super-secret-string',
    resave: false,
    saveUninitialized: true,
}));
app.use(express.static('public'));


const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY,
  apiSecretKey: process.env.SHOPIFY_API_SECRET,
  scopes: process.env.SHOPIFY_SCOPES.split(','),
  hostName: process.env.HOST.replace(/https?:\/\//, ''),
  apiVersion: LATEST_API_VERSION,
  logger: {
    level: 'error',
    log: (level, message) => {
        if (level === 'error') {
            console.error(message);
        }
    },
},
})

// Use product routes
app.use('/api/v1', productRoutes(shopify));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
