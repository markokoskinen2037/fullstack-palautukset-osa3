const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person.js')


app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(':method :  :status :informaatio :res[content-length] - :response-time ms'))

morgan.token('informaatio', function (req, res) { return JSON.stringify(req.body) })


let numeroTaulukko = [
    { name: "Reiska", numero: 0451235, id: 1, date: new Date() },
    { name: "Poliisi-setä", numero: 112, id: 2, date: new Date() }
]


app.get('/api/persons', (request, response) => {
    console.log("helo")
    Person
      .find({})
      .then(persons => {
          console.log("asdddddddddddd")
        response.json(persons)
      })
  });

app.get('/info', (req, res) => {
    res.send("<p>Taulukossa on on " + numeroTaulukko.length + " ukkelin tiedot</p>" +
        new Date())
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = numeroTaulukko.find(olio => olio.id === id)

    if (entry) {
        return response.json(entry)
    } else {
        return response.status(404).end()
    }

})

app.delete('/api/persons/:id', (request, response) => {
    Person
      .findByIdAndRemove(request.params.id)
      .then( () => {
        response.status(204).end()
      })
      .catch( () => {
        response.status(400).send({ error: 'malformatted id' })
      })
  })

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body)
  

  
    const person = new Person({
      name:body.name,
      numero:body.numero
    })
  
    person
      .save()
      .then(
          response.json(person)
      )
  })








const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})