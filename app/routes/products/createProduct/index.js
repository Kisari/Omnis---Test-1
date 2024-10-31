import { shopifyApi } from '@shopify/shopify-api';

const createProduct = async (req, res, shopify) => {

    const { title, description, image, price } = req.body;

    const productData = {
        product: {
            title,
            body_html: description,
            images: [{ src: image }],
            variants: [{ price }],
        },
    };
    

    try {
        // Create a Shopify client instance
        const client = new shopify.clients.Rest({ 
          session: {
            shop: process.env.SHOPIFY_URL,
            accessToken: process.env.ACCESS_TOKEN,
          }
         });

        // Send POST request to create the product
        const response = await client.post({
            path: 'products',
            data: productData,
            type: 'application/json', // Use the correct content type directly
        });

        res.status(201).json({
            status: 'success',
            message: 'Product has been created',
            product: response.body.product, // Return the created product data from response
        });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).send('Error creating product');
    }
};

export default createProduct;
