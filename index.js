const express = require('express')
const app = express()

let numeroTaulukko = [
  {name:"Reiska", numero:0451235},
  {name:"Poliisi setä", numero:112}
]

app.get('/api/persons', (req, res) => {
  res.json(numeroTaulukko)
})

app.get('/info', (req, res) => {
    res.send("<p>Taulukossa on on " + numeroTaulukko.length + " ukkelin tiedot</p>" + 
    new Date())
  })

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})