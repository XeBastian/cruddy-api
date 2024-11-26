const mongoose = require("mongoose")

const ProductSchema = mongoose.Schema(
    {
        name: {type: String, required: [true, "Enter Product Name"], unique: true},
        description: {type: String, required: true},
        quantity: {type: Number, required: true, default: 0},
        price: {type: Number, required: true},
        discountPercentage: {type: Number, required: false},
        rating: {type: Number, required: true},
        stock: {type: Number, required: true},
        brand: {type: String, required: true},
        category: {type: String, required: true},
        thumbnail: {type: String, required: true},
        images: {type: [String], required: true},
    },
    {
        timestamps: true,
    }
)

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product
