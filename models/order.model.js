const mongoose = require("mongoose")

const orderschema = new mongoose.Schema(
    {
        //user_id: String,
        cart_id: String,
        userInfo: {
            fullName: String,
            phone: String,
            address: String
        },
        products: [
            {
                product_id: String,
                price: Number,
                discountPercentage: Number,
                quantity: Number
            }
        ],
        deleted: {
            type: Boolean,
            default: false
        },
        deleteAt: Date
    },
    {
        timestamps: true
    }
);
const Order = mongoose.model('Order', orderschema, "orders");

module.exports = Order;