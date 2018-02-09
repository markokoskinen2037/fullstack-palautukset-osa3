const express = require('express')
const app = express()

let data = [
  {name:"Reiska", numero:0451235},
  {name:"Poliisi setä", numero:112}
]

app.get('/api/persons', (req, res) => {
  res.json(data)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})