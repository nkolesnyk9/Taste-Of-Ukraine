const express = require('express')
const app = express()
const port = 3000
const Recipe = require('./models/recipes.js')
const methodOverride = require('method-override')

const { render } = require('ejs');

const recipeController = require('./controllers/recipeCTRL.js')

const mongoose = require('mongoose')


// const recipe = require('./models/recipes.js')


const mongoURI = 'mongodb://localhost:27017/recipes'
const db = mongoose.connection

const recipeSeed = require('./models/seed.js')
const recipe = require('./models/seed.js')
// Connect to Mongo

mongoose.connect(mongoURI, () => {
    console.log('the connection with mongod is established')
  })
  
  // Error / success
  db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
  db.on('connected', () => console.log('mongo connected: ', mongoURI))
  db.on('disconnected', () => console.log('mongo disconnected'))

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use('/recipes', recipeController)

//   Recipe.create(recipeSeed, (err, data) => {
//     if (err) console.log(err.message)
//     console.log('Successfully added new recipes.')
//  })
// Recipe.deleteMany({}).then(() => {
//   Recipe.insertMany(recipeSeed).then((car) => {
//     console.log("updated recipes")
    
//   })
// })

// //INDEX PAGE
// app.get('/recipes', (req, res) => {
//     res.render('index.ejs', {recipe:recipe
//     })
// })

// //ADD NEW PAGE
// app.get('/recipes/new', (req, res) => {
//     res.render('new.ejs')
// })

// //SHOW PAGE
// app.get('/recipes/:id', (req, res) => {
//     res.render('show.ejs', {
//         recipe:recipe[req.params.id]
//     })
// })

// // ADD CREATE PAGE
// app.post('/recipes', (req, res) => {
//     recipe.push(req.body)
//     res.redirect('/recipes')
// })

// // ADD DELETE ROUTE
// app.delete('/recipes/:id', (req, res) => {
//     recipe.splice(req.params.id, 1)
//     res.redirect('/recipes')
// })

// // ADD EDIT PAGE
// app.get('/recipes/:id/edit', (req, res) => {
//     res.render(
//         'edit.ejs',
//         {
//             recipe:recipe[req.params.id],
//             id: req.params.id
//         }
//     )
// })

// //ADD PUT ROUTE
// app.put('/recipes/:id', (req,res) => {
//     recipe[req.params.id] = req.body
//     res.redirect('/recipes')
// })

app.listen(port, () => {
    console.log("Server is listening 🥳")
})
