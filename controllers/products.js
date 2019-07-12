const axios = require('axios');

let products;

async function initProducts() {
    // Get random names from a lorem ipsum api
    const numberOfProducts = 100;
    const textIpsumUrl = `https://baconipsum.com/api/?type=meat-and-filler&sentences=${numberOfProducts}&format=text`;

    try {
        const sentences = (await axios.get(textIpsumUrl)).data;
        const names = sentences.substring(0, sentences.length - 1).split('.');

        // Set the products
        products = names.map((name, index) => ({
            id: index,
            name: name.trim(),
            price: Math.round(1 + Math.random() * 1000),
            sold: Math.round(1 + Math.random() * 1000),
            image: `https://picsum.photos/id/${index}/200`
        }));

    } catch (error) {
        console.log(error);
        products = [];
    }
}

module.exports = async function () {
    // If the products were not initialized, initialize them
    if (!products) await initProducts();
    return products;
};