const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require ('body-parser');
const cors = require('cors')
const itemsRouter = require("./routes/items")

const app = express()
const port = 5000;


app.use(bodyParser.json())
app.use(cors())
app.use('/api', itemsRouter)

//Connect to MongoDB

mongoose.connect('mongodb://localhost:27017/crud-app', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('Connected to MongoDB')
})

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})