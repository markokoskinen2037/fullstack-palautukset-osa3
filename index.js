const express = require('express')
const app = express()

let numeroTaulukko = [
    { name: "Reiska", numero: 0451235, id:1 },
    { name: "Poliisi-setä", numero: 112, id:2 }
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

    if( entry ){
        response.json(entry)
    } else {
        response.status(404).end()
    }

    response.json(entry)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})