const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Import routes
const cartRoutes = require('./routes/cart.routes');
const categoryRoutes = require('./routes/category.routes');
const orderRoutes = require('./routes/order.routes');
const paymentRoutes = require('./routes/payment.routes');
const productRoutes = require('./routes/product.routes');
const reviewRoutes = require('./routes/reviews.routes');
const userRoutes = require('./routes/user.routes');

app.use(express.json());
app.use(cors());

// Use routes
app.use('/api/cart', cartRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/products', productRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/users', userRoutes);


app.use('/', (req, res) => {
    res.send('All good 😊');
})

// 404 error handling
app.all('*', (req, res, next) => {
    next('Route Not Found');
});

module.exports = app;
