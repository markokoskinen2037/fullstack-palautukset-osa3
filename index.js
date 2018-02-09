const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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

    const newId = getRandomArbitrary(1,1000000)
    const newEntry = request.body
    newEntry.id = newId
    newEntry.date = new Date()
    console.log(newEntry)

    if(request.body.name === undefined || request.body.numero === undefined){
        return response.status(400).json({error: 'name or numero is null'})
    }


    numeroTaulukko = numeroTaulukko.concat(newEntry)
  
    response.json(newEntry)
  })

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})