const mongoose = require("mongoose")

const cartschema = new mongoose.Schema(
    {
        user_id: String,
        products: [
            {
            product_id: String,
            quantity: Number
            }
        ]
    },
    {
        timestamps: true
    }
);
const Cart = mongoose.model('Cart', cartschema, "carts");

module.exports = Cart;