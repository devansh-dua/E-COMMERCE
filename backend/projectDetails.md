1. Setup
    npm init -y
2. Install packages
    npm i express mongoose bcrypt jsonwebtoken 
3. Now create the basic template inside `app.js`
    inside `app.js`
    ```js
    const path = require('path');
    const express = require('express');
    const app = express();
    const PORT = 4444;

    app.use(express.urlencoded({extended:true}));


    app.listen(PORT,()=>{
        console.log(`http://localhost:`+PORT);
    });
    ```
4. Now create the folders that we need
    - models: To create database schema and models
    - routes: Redirection for requests
    - controllers: Business logic
    - lib: To create specific library like axios
    - middlewares 
    - data : for mongodb 
    ```js
    mkdir routes controllers lib middlewares models data
    ```
5. Now think of what all functionalities do we want in our e-commerce
    - CRUD product
        POST  : /product
        GET   : /product?id=""
        PUT   : /product
        DELETE: /product
        To do the product work
        We need a model first
    product schema
    Create `/models/products.js`
    ```js
    const { default: mongoose } = require("mongoose");

    const productsSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
        },
        imageUrl: {
            type: String,
        },
        rating:{
            type: Number,
        },
        adminId:{
            type: mongoose.Types.ObjectId,
            ref: "Users" // This can only be added by a user
        }
    })
    
    module.exports = new mongoose.model("Products", productsSchema);
    ```

    - Create User
    `/models/users.js`

    ```js
    const { default: mongoose } = require("mongoose");
    const { randomUUID } = require('crypto');
    const cartSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            default: 1,
        },
        price: Number,
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Products"
        }
    });

    const purchasedItemSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true,
        },
        date: { type: Date },
        quantity: Number,
        orderId: {
            type: mongoose.Schema.Types.UUID,
            default: () => randomUUID()
        }
    });

    const userSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: String,
        role: {
            type: String,
            default: "user"
        },
        email: {
            type: String,
        },
        address: {
            type: String,
        },
        purchaseHistory: {
            type: [purchasedItemSchema]
        },
        cart: [cartSchema]
    })

    module.exports = new mongoose.model('Users', userSchema);
    ```
5. Now let's work on routes
    `/routes/admin.routes.js`
    `/routes/users.routes.js`

    app.js -> 
    const usersRoutes = require('./routes/users.routes.js');
    app.use('/users', usersRoutes)

6. `/routes/users.routes.js`
    ```js
    const path = require('path');
    const express = require('express');
    const usersModel = require('../models/users');
    const router = express.Router();

    // This will create new user
    router.post('/create', async (req, res, next) => {
        const {
            username,
            password,
            profileImage,
            email,
            address,
        } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                message: "Username or password missing"
            })
        }

        try {
            let user = await usersModel.create({
                username,
                password,
                profileImage: profileImage || "",
                email: email || "",
                address: address || "",
            })
            res.status(200).json({
                message: "User created successfully",
                status: 200,
                user:{
                    username,
                    profileImage,
                    email 
                }
            })
        } catch (error) {
            res.status(500).json({
                message: error.message,
                error
            })
        }

    });



    module.exports = router;
    ```



