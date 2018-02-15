import React from 'react';
import axios from 'axios';
import PersonService from "./services/persons.js"

function myFunction(person) {
  return function () {
    console.log("deleting person with id" + person._id)
    PersonService.deletePerson(person)
   
  }
  console.log("page should refresh now...")

}

const PhoneBookEntry = ({ person }) => {
  console.log(person)
  console.log(person._id)
  console.log(person.name)
  console.log(person.numero)
  return (
    <li key={person.name}>{person.name} {person.numero} <button onClick={myFunction(person)}>poista</button></li>
  )
}

export default PhoneBookEntry