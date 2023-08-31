const {Router} = require('express')
const UsersDao = require('../dao/users.dao')

const Users = new UsersDao()

const router = Router()

router.get('/', async (req, res) => {
    const users = await Users.findAll()
    res.json({message: users})
})

router.get('/create', (req, res) => {
res.render('createUser.handlebars')
})



router.post('/', async (req, res) => {
const {name, lastname, email, password} = req.body

const newUserInfo = {
    name,
    lastname,
    email,
    password
}

    const newUser = await Users.insertOne(newUserInfo)

    res.json({ message: newUser._id})

    // UsersDao.create(req.body)
    // res.json({message: 'Creaste un user'})
    
})

module.exports = router

//API de mi proyecto