const mongoose = require('mongoose')

const connectMongo = async () => {
    try{
        await mongoose.connect('mongodb+srv://kirarap:admin@casteru53310.7tnhmmk.mongodb.net/ecommerce?retryWrites=true&w=majority'
        )
        console.log('db is connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectMongo