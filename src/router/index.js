const productsController = require('../controllers/products.controller')
const cartsController = require('../controllers/carts.controller')
const usersController = require('../controllers/users.controller')

const router = (app) =>{
    app.use('/products', productsController)
    app.use('/carts', cartsController)
    app.use('/users', usersController)
}

module.exports = router