const mongoose = require('mongoose')

// korvaa url oman tietokantasi urlilla. ethän laita salasanaa Gothubiin!
const url = 'mongodb://admin:XXXXXXXXXXXXXXX@ds229448.mlab.com:29448/fullstack2037'

mongoose.connect(url)

const Henkilo = mongoose.model('Henkilo', {
    nimi: String,
    numero: String,
})




if (process.argv[2] != undefined && process.argv[3] != undefined) {
    const henkilo = new Henkilo({
        nimi: process.argv[2],
        numero: process.argv[3]
    })

    henkilo
        .save()
        .then(response => {
            console.log('lisätään henkilö [name] numero [numero] luetteloon')
            mongoose.connection.close()
        })
} else { //Tulostetaan tietokannan setit:
    console.log("ei parametrejä annettu.")
    console.log("puhelinluettelo:")

    Henkilo
        .find({})
        .then(result => {
            result.forEach(person => {
                console.log(person.nimi + "  " + person.numero)
            })
            mongoose.connection.close()
        })


}






