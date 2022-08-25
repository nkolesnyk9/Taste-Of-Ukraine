const express = require('express')
const app = express()
const Recipe = require('./models/recipes.js')
const methodOverride = require('method-override')

const session = require('express-session')

const { render } = require('ejs');

require('dotenv').config()
const PORT = process.env.PORT

const SESSION_SECRET = process.env.SESSION_SECRET
console.log('Here is the session secret')
console.log(SESSION_SECRET)

app.use(session({
	secret: SESSION_SECRET,
	resave: false, 
	saveUninitialized: false 
}))

app.use((req, res, next) => {
	res.locals.currentUser = req.session.currentUser

	next()
})

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(methodOverride('_method'))

const recipeController = require('./controllers/recipeCTRL.js')
app.use('/recipes', recipeController)

const userController = require('./controllers/userCTRL.js')
app.use('/users', userController)


const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI

mongoose.connect(mongoURI, () => {
    console.log('the connection with mongod is established')
  })


// const recipe = require('./models/recipes.js')



const db = mongoose.connection


const recipeSeed = require('./models/seed.js')
const recipe = require('./models/seed.js')
// Connect to Mongo


  
  // Error / success
  db.on('error', (err) => console.log(err.message + ' is Mongod not running?'))
  db.on('connected', () => console.log('mongo connected: ', mongoURI))
  db.on('disconnected', () => console.log('mongo disconnected'))




//   Recipe.create(recipeSeed, (err, data) => {
//     if (err) console.log(err.message)
//     console.log('Successfully added new recipes.')
//  })
// Recipe.deleteMany({}).then(() => {
//   Recipe.insertMany(recipeSeed).then((car) => {
//     console.log("updated recipes")
    
//   })
// })



app.listen(PORT, () => {
    console.log(`Server is listening  on ${PORT} 🥳`)
})
