const mongoose = require('mongoose')

const db = process.env.MONGO_URI
const DB = () => {
    mongoose.connect(db, {
        useUnifiedTopology: true
    }).then((r)=> console.log("DB Connected"))
    .catch((err)=> console.log(`DB Error ${err}`))
}

module.exports = DB;