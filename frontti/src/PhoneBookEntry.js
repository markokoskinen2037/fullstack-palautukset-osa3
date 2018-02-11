import React from 'react';
import axios from 'axios';
import PersonService from "./services/persons.js"



const PhoneBookEntry = ({ person }) => {
  return (
    <li key={person.name}>{person.name} {person.numero} <button>poista</button></li>
  )
}

export default PhoneBookEntry