const express = require('express')
const app = express()
const port = 3000

const recipe = require('./models/recipes.js')

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//INDEX PAGE
app.get('/recipes', (req, res) => {
    res.render('index.ejs', {
        recipe
    })
})

//ADD NEW PAGE
app.get('/recipes/new', (req, res) => {
    res.render('new.ejs')
})

//SHOW PAGE
app.get('/recipes/:id', (req, res) => {
    res.render('show.ejs', {
        recipe:recipe[req.params.id]
    })
})

// ADD CREATE PAGE
app.post('/recipes', (req, res) => {
    recipe.push(req.body)
    res.redirect('/recipes')
})

app.listen(port, () => {
    console.log("Server is listening 🥳")
})
