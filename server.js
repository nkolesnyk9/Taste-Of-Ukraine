const express = require('express')
const app = express()
const port = 3000

const recipe = require('./models/recipes.js')

app.use(express.static("public"))

//INDEX PAGE
app.get('/recipes', (req, res) => {
    res.render('index.ejs', {
        recipe
    })
})

//SHOW PAGE
app.get('/recipes/:id', (req, res) => {
    res.render('show.ejs', {
        recipe:recipe[req.params.id]
    })
})

app.listen(port, () => {
    console.log("Server is listening 🥳")
})
