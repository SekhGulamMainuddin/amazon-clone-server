const express= require('express');
const productRouter = express.Router();
const auth = require('../middlewares/auth');
const {Product} = require('../models/product');
const ratingsSchema = require('../models/ratings');

productRouter.get("/api/products", auth, async (req, res) => {
    try {
        const products = await Product.find({category: req.query.category});
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

productRouter.get("/api/products/search/:name", auth, async (req, res) =>{
    try {
        const products = await Product.find({
            name: {$regex: req.params.name, $options: "i"},
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

productRouter.post("/api/rate-product", auth, async (req, res) =>{
    try {
        const {id, ratings} = req.body;

        let product = await Product.findById(id);
        for(let i=0; i<product.ratings.length; i++) {
            if(product.ratings[i].userId==req.user){
                product.ratings.splice(i, 1);
                break;
            }
        }

        const ratingsSchema= {
            "userId": req.user,
            ratings,
        };

        product.ratings.push(ratingsSchema);
        product= await product.save();
        
        res.json(product);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

productRouter.get("/api/deal-of-the-day", auth, async (req, res) =>{
    try {
        let products = await Product.find({});

        products= products.sort((p1, p2)=>{
            let p1Sum= 0;
            let p2Sum= 0;

            for(let i=0; i<p1.length; i++){
                p1Sum+= p1[i].ratings.ratings;
            }
            for(let i=0; i<p2.length; i++){
                p2Sum+= p2[i].ratings.ratings;
            }

            return p1Sum < p2Sum ? 1 : -1;

        });
        
        res.json(products[0]);

    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

module.exports= productRouter;