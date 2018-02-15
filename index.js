const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./bakki/models/person.js')


app.use(cors())
app.use(express.static('bakki/build'))
app.use(bodyParser.json())
app.use(morgan(':method :  :status :informaatio :res[content-length] - :response-time ms'))

morgan.token('informaatio', function (req, res) { return JSON.stringify(req.body) })


let numeroTaulukko = []


app.get('/api/persons', (request, response) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })

});


app.get('/info', (req, res) => {
    res.send("<p>Taulukossa on on " + numeroTaulukko.length + " ukkelin tiedot</p>" +
        new Date())
})

app.get('/api/persons/:id', (request, response) => {
    console.log("Searching for id: " + request.params.id)

    Person
        .findById(request.params.id)
        .then(person => {
            response.json(person)
        })

})

app.delete('/api/persons/:id', (request, response) => {
    Person
        .findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch(() => {
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
        name: body.name,
        numero: body.numero
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