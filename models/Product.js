let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let productSchema = new Schema({
    title: String,
    description: {
        type: String
    },
    price: Number,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category'
    },
    location: {
        longitude: {
            type: Number
        },
        latitude: {
            type: Number
        }
    }
});

let ProductModel = mongoose.model('product', productSchema);

exports.PRODUCT_MODEL = ProductModel;