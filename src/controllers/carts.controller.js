const {Router} = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.render('carts.handlebars')
})

module.exports = router

//API de mi proyecto