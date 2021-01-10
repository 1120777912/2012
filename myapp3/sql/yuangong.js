const db = require('./db.js');

const yuangong = new db.mongoose.Schema({
    "username": {
        type: String
    },
    "sex": {
        type: String
    },
    "age": {
        type: Number
    },
    "profession": {
        type: String
    },
    "time": {
        type: String
    }
})

module.exports = db.mongoose.model('yuangong', yuangong)