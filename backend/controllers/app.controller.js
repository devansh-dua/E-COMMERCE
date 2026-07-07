const productsModel = require("../models/products");
const usersModel = require("../models/users");




module.exports.getProduct = async (req, res) => {

    try {

        const { id } = req.params;
        const product = await productsModel.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        return res.status(200).json({
            message: "Product fetched successfully",
            product
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

}

module.exports.getProductsByCategory = async (req, res) => {
    try {
        const { category } = req.params;

        const products = await productsModel.find({
            category: category.toLowerCase()
       });

        return res.status(200).json({
            message: "Products fetched successfully",
        products
        });

    } catch (err) {
        return res.status(500).json({
            message: err.message
        });
    }
};

module.exports.addToCart = async (req, res) => {

    try {

        const { productId } = req.body;

       const product = await productsModel.findById(productId);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
    req.user.cart.push({
        name: product.name,
            price: product.price,
            quantity: 1,
            productId: product._id
        });

        await req.user.save();

        return res.status(200).json({
            message: "Product added to cart successfully",
            cart: req.user.cart
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

}

module.exports.getUserDetails = async (req, res) => {

    try {

        return res.status(200).json({
            message: "User details fetched successfully",
            user: req.user
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

}
module.exports.buyCart = async (req, res) => {

    try {

        if (req.user.cart.length === 0) {
            return res.status(400).json({
                message: "Cart is empty"
            });
        }

        req.user.cart.forEach(item => {

            req.user.purchaseHistory.push({
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                date: new Date()
            });

        });

        req.user.cart = [];

        await req.user.save();

        return res.status(200).json({
            message: "Order placed successfully",
            purchaseHistory: req.user.purchaseHistory
        });

    } catch (err) {

        return res.status(500).json({
            message: err.message
        });

    }

}

module.exports.orderHistory = async (req, res) => {

    return res.status(200).json({
        purchaseHistory: req.user.purchaseHistory
    });

}