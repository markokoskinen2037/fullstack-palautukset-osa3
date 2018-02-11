const mongoose = require('mongoose')

const url = 'mongodb://admin:1234@ds229448.mlab.com:29448/fullstack2037'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  numero: String
})

module.exports =  Person