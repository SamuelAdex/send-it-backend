if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require("express")
const cors = require("cors")
const morgan = require("morgan")
const DB = require("./config/DB")

let app = express()

DB()


app.use(express.static('public'))
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))


//TEST API
app.get('/test', (req, res) => {
    res.send("<h1 style='color: red;'>API Running Successfully</h1>")
})

//API Routes
const fileRoutes = require('./routes/file')
app.use('/api/files', fileRoutes)



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`)
})