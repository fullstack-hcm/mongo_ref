let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    products: [
        {
            type: Schema.Types.ObjectId,
            ref: 'product'
        }
    ]
});
/**
 * xinchao
 * camelcase: xinChao
 * snakecase: xin_chao (best)
 * kebadcase: XinChao
 */
let CategoryModel = mongoose.model('category', categorySchema);

exports.CATEGORY_MODEL = CategoryModel;