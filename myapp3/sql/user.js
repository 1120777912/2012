const db = require('./db.js')

const adminSchema = new db.mongoose.Schema({
    "username": {
        type: String
    },
    "password": {
        type: String
    },
    "time": {
        type: String
    }
})


module.exports = db.mongoose.model("users", adminSchema)