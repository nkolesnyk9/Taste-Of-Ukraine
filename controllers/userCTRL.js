const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user.js')

const router = express.Router()

router.get('/register', (req, res) => {
    res.render('users/register.ejs')
})

router.post('/register', (req, res) => {

    const salt = bcrypt.genSaltSync(10)

    // console.log(req.body)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    // console.log(req.body)
    User.findOne({username: req.body.username}, (err, userExists) => {
        if(userExists) {
          res.send('that username is taken')
        } else {
          User.create(req.body, (err, createdUser) => {
            req.session.currentUser = createdUser
            res.redirect('/recipes')
          })
        }
      })
})

router.get('/signin', (req, res) => {
    res.render('users/signin.ejs')
  })

  router.post('/signin', (req, res) => {
    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (foundUser) {
        const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
    
        if (validLogin) {
            req.session.currentUser = foundUser
            res.redirect('/recipes')
        } else {
          res.send('Invalid username or password')
        }
      } else {
        res.send('Invalid username or password')
      }
    })
  })

  router.get('/signout', (req, res) => {
    req.session.destroy()
    res.redirect('/recipes')
  })

module.exports = router