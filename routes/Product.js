let express = require('express');
let route   = express.Router();
let { PRODUCT_MODEL }   = require('../models/Product');
let { CATEGORY_MODEL }  = require('../models/Category');
let ObjectID = require('mongoose').Types.ObjectId;

route.post('/add-product', async (req, res) => {
    try {
        let { title, description, price, category, longitude, latitude } = req.body;
 
        if (Number.isNaN(Number(price)))
            res.json({ error: true, message: 'param_invalid_price' });
        
        if (!ObjectID.isValid(category))
            res.json({ error: true, message: 'param_invalid_category' });


        let infoProduct = new PRODUCT_MODEL({
            title, description, price, category,
            location: {
                longitude, latitude
            }
        });

        let infoProductAfterInserted = await infoProduct.save();
        if (!infoProductAfterInserted) res.json({ error: true, message: 'cannot_insert' });

        let { _id: productID } = infoProductAfterInserted;
        let infoCategoryAfterUpdate = await CATEGORY_MODEL.findByIdAndUpdate(category, {
            $push: { 
                products: productID
            }
        });

        if (!infoCategoryAfterUpdate)
            res.json({ error: true, message: 'cannot_update_category' });

        res.json({ error: false, data: infoProductAfterInserted })
    } catch (error) {
        res.json({ error: true, message: error.message });
    }
});

route.get('/list-product', async (req, res) => {
    let listProduct = await PRODUCT_MODEL.find({}).populate('category')
    res.json({ error: false, data: listProduct  })
});

route.get('/list-product-all-category', async (req, res) => {
    let listProduct = await CATEGORY_MODEL.find({}).populate({
        path: 'products',
        select: 'title description',
        // match: {
        //     status: 1
        // },
        // option: {
        //     limit: 5
        // }
    })
    res.json({ error: false, data: listProduct  })
});

route.get('/list-product/:categoryID', async (req, res) => {
    let listProduct = await PRODUCT_MODEL.find({
        category: req.params.categoryID
    }).populate('category')
    res.json({ error: false, data: listProduct  })
});

exports.PRODUCT_ROUTE = route;