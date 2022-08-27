const express = require('express')
const router = express.Router()
const Recipe = require('../models/recipes.js')

const authRequired = (req, res, next) => {
	if(req.session.currentUser){
		next()
	} else {
		// res.send('You must be logged in to do that!')
		res.redirect('/users/signin')
	}
}

router.get('/', async (req, res) => {
    let recipe = await Recipe.find({})
    console.log('recipe', recipe)
    res.render('index.ejs', {recipe})
})

//INDEX PAGE
router.get('/', (req, res) => {
    Recipe.find({}, (error, recipe) => {
        res.render('index.ejs', {
            recipe})
    })
   
})
// Soups Page
router.get('/soups', (req, res) => {
    Recipe.find({}, (error, recipe) => {
        res.render('soups.ejs', {
            recipe})
    })
   
})
// Main course page
router.get('/main', (req, res) => {
    Recipe.find({}, (error, recipe) => {
        res.render('main.ejs', {
            recipe})
    })
   
})
// Desserts
router.get('/desserts', (req, res) => {
    Recipe.find({}, (error, recipe) => {
        res.render('desserts.ejs', {
            recipe})
    })
   
})

//ADD NEW PAGE
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

//SHOW PAGE
router.get('/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
    res.render('show.ejs', {
        recipe:recipe
    })
})

router.get('/')

// ADD CREATE PAGE
router.post('/', (req, res) => {
    Recipe.create(req.body, (error, createdRecipe) => {
        if (error) {
            console.log("error", error)
            res.send(error)
        } else {
            res.redirect('/recipes')
        }
    })
})

// ADD DELETE ROUTE
router.delete('/:id', authRequired, (req, res) => {
    Recipe.findByIdAndRemove(req.params.id, (err, data) => {
        res.redirect('/recipes')
    })
    
})

// ADD EDIT PAGE
router.get('/:id/edit', authRequired, (req, res) => {
    Recipe.findById(req.params.id, (err, recipe) => {
        res.render(
            'edit.ejs',
            {
                recipe:recipe // passing in found recipe
            }
        )
    })
   
})

//ADD PUT ROUTE
router.put('/:id', (req,res) => {
    Recipe.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
        res.redirect('/recipes')
    })
    
})

module.exports = router