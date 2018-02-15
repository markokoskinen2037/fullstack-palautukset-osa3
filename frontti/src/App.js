import React from 'react';
import axios from 'axios';
import PhoneBookEntry from "./PhoneBookEntry.js"
import PersonService from "./services/persons.js"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    console.log("will mount...")

    PersonService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    console.log("click")

    const personObject = {
      name: this.state.newName,
      numero: this.state.newNumber
    }
    console.log("personObject luotu")

    let dublicate = false
    this.state.persons.forEach(person => {
      if (person.name === personObject.name) {
        dublicate = true;
        this.setState({
          newNumber: "",
          newName: ""
        })
      }
    });

    if (!dublicate) { //Ei dublikaatti, lisätään tietokantaan
      console.log("trying to add to new number...")

      PersonService.create(personObject);


      console.log("here we are")

      this.setState({
        newNumber: "",
        newName: ""
      })

      PersonService
      .getAll()
      .then(response => {
        this.setState({ persons: response.data })
      })


    }

  }


  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  render() {

    let personsToShow = [];

    if (this.state.filter !== '') {
      personsToShow = this.state.persons.filter(person => person.name.indexOf(this.state.filter) > -1)
      console.log(personsToShow)
    } else {
      personsToShow = this.state.persons
      console.log(personsToShow)
    }






    return (
      <div>
        <h2>Puhelinluettelo v.2</h2>
        <pre>huom! kun poistat numeron tietokannasta, päivitä sivua manuaalisesti!</pre>


        <div onChange={this.handleFilterChange}>rajaa näytettäviä: <input /></div>


        <h2>Lisää uusi:</h2>
        <form onSubmit={this.addPerson} >
          <div onChange={this.handleNameChange}>
            nimi: <input value={this.state.newName} />
          </div>
          <div onChange={this.handleNumberChange}>
            numero: <input />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>


        <h2>Numerot</h2>
        <ul>
          {personsToShow.map(person => <PhoneBookEntry key={person.name} person={person} />)}
        </ul>
      </div>
    )
  }
}

export default App