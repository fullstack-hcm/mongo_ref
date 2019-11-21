let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let app = express();

let { CATEGORY_ROUTE } = require('./routes/Category');
let { PRODUCT_ROUTE }  = require('./routes/Product');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/category', CATEGORY_ROUTE);
app.use('/product', PRODUCT_ROUTE);

app.get('/', (req, res) => {
    res.json({ message: 'server connected' });
});

let uri = `mongodb://localhost/mongo_ref_2410`;

mongoose.connect(uri);
mongoose.connection.once('open', () => {
    console.log(`mongodb connected`);
    app.listen(3000, () => console.log(`server start at port 3000`));
});
