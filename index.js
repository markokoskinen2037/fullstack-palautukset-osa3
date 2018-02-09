const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')

app.use(bodyParser.json())
app.use(morgan(':method :  :status :informaatio :res[content-length] - :response-time ms'))
morgan.token('informaatio', function (req, res) { return JSON.stringify(req.body) })


let numeroTaulukko = [
    { name: "Reiska", numero: 0451235, id: 1, date: new Date() },
    { name: "Poliisi-setä", numero: 112, id: 2, date: new Date() }
]

app.get('/api/persons', (req, res) => {
    res.json(numeroTaulukko)
})

app.get('/info', (req, res) => {
    res.send("<p>Taulukossa on on " + numeroTaulukko.length + " ukkelin tiedot</p>" +
        new Date())
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const entry = numeroTaulukko.find(olio => olio.id === id)

    if (entry) {
        response.json(entry)
    } else {
        response.status(404).end()
    }

    response.json(entry)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    numeroTaulukko = numeroTaulukko.filter(olio => olio.id !== id)

    response.status(204).end()
})

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}



app.post('/api/persons', (request, response) => {

    const newId = getRandomArbitrary(1, 1000000)
    const newEntry = request.body
    newEntry.id = newId
    newEntry.date = new Date()

    if (request.body.name === undefined) {
        return response.status(400).json({ error: 'name is null' })
    }
    if (request.body.numero === undefined) {
        return response.status(400).json({ error: "numero is null" })
    }

    let addable = true

    numeroTaulukko.find(function (element) {
        if (element.name === request.body.name) {
            addable = false
        }
    })


    if (addable) {
        numeroTaulukko = numeroTaulukko.concat(newEntry)
    } else {
        return response.status(400).json({ error: "dublicate detected" })
    }


})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})