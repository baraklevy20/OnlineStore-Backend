const checkoutNodeJssdk = require('@paypal/checkout-server-sdk');
const getProducts = require('../controllers/products')

// The below functions were taken from https://developer.paypal.com/docs/checkout/reference/server-integration/setup-sdk/#set-up-the-environment

/**
 *
 * Returns PayPal HTTP client instance with environment that has access
 * credentials context. Use this instance to invoke PayPal APIs, provided the
 * credentials have access.
 */
function client() {
    return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

/**
 *
 * Set up and return PayPal JavaScript SDK environment with PayPal access credentials.
 * This sample uses SandboxEnvironment. In production, use LiveEnvironment.
 *
 */
function environment() {  
    let clientId = process.env.PAYPAL_CLIENT_ID;
    let clientSecret = process.env.PAYPAL_CLIENT_SECRET;

    return new checkoutNodeJssdk.core.SandboxEnvironment(
        clientId, clientSecret
    );
}

module.exports = async function handleRequest(req, res) {
    const orderId = req.body.orderId;
    const productId = parseInt(req.body.productId);

    let request = new checkoutNodeJssdk.orders.OrdersGetRequest(orderId);

    let order;
    try {
        order = await client().execute(request);
        // Validate the transaction details are as expected
        let products = await getProducts();
        
        if (parseInt(order.result.purchase_units[0].amount.value) !== products[productId].price) {
            return res.status(400).send({});
        }

        // Update the amount of sold products
        products[productId].sold++;

        // Add the purchase to the user
        if (!req.session.purchases) {
            req.session.purchases = {};
        }

        if (!req.session.purchases[productId]) {
            req.session.purchases[productId] = 0;
        }

        req.session.purchases[productId]++;
        
        return res.status(200).send({});
    } catch (err) {
        // Handle any errors from the call
        console.error(err);
        return res.status(500).send({});
    }
}