// import { Shopify } from '@shopify/shopify-api';

const createProduct = async (req, res) => {
  //   const session = req.session;

  // const product = req.body;

  // try {
  //   // Initialize the Shopify client
  //   const client = new Shopify.Clients.Rest(session.shop, session.accessToken);

  //   // Send POST request to create product
  //   const response = await client.post({
  //     path: 'products',
  //     data: product,
  //     type: Shopify.DataType.JSON,
  //   });

  //   // Respond with the created product information
  //   res.status(201).json({
  //       status: 'success',
  //       message: 'Product has created',
  //       product: response.body.product,
  //   });
  // } catch (error) {
  //   console.error('Error creating product:', error);
  //   res.status(500).send('Error creating product');
  // }
};


export default createProduct