let express = require('express');
let route   = express.Router();
let { CATEGORY_MODEL } = require('../models/Category');
  
route.post('/add-category', async (req, res) => {
    let { title, description } = req.body;

    let infoCategory = new CATEGORY_MODEL({
        title, description
    });

    let infoCategoryAfterInsert = await infoCategory.save();
    res.json({ infoCategoryAfterInsert });
});

route.get('/list-categories', async (req, res) => {
   try {
        let listCategory = await CATEGORY_MODEL.find({});
        res.json({ listCategory })
   } catch (error) {
       res.json({ error: true, message: error.message });
   }
});

exports.CATEGORY_ROUTE = route;