import express from 'express'
const router = express.Router()
import Shop from "../../models/products/dbProducts.js"

router.route("/products").get(async (req,res)=>{
    if(req.query.search){
        const search = req.query.search.toLowerCase();
        var finalitems=[]
        const searchlist =await Shop.find()
            .then(items => items.forEach(item => {
                const lowcasename =item.name.toLowerCase()
                if(lowcasename.includes(search)){
                    finalitems.push(item)
                }
            }))
            res.json(finalitems)

    } else{
        const products = await Shop.find({});
        res.send(products);
    }

});

router.route("/products/:id").get(async (req,res)=>{
    const product = await Shop.findOne({_id:req.params.id});
    if(product){
        res.send(product);
    }else{
        res.status(404).send({
            message:'product not found'
        })
    }
    
});

router.route("/products").post(async (req,res)=>{
    const product = new Shop({
        name:req.body.name,
        price: req.body.price,
        image: req.body.image,
        category:req.body.category,
        productType:req.body.productType,
        countInStock: req.body.countInStock,
        description: req.body.description,
    })
    const newProduct = await product.save();
    if(newProduct){
        return res.status(201).send({
            msg: 'new product created', data: newProduct
        })
    }
    else{
        return res.status(500).send({
            msg: ' there was an error adding your product'
        })
    }
});

export default router;