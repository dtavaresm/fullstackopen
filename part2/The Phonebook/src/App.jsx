import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm  from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    let nameExists = persons.find(person => personObject.name === person.name)
    nameExists === undefined ?
      setPersons(persons.concat(personObject)) :
      alert(`${personObject.name} is already in the phonebook!`)
    setNewName('')
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addFilter = (event) => {
    event.preventDefault()
    newFilter === '' ? setShowAll(showAll) : setShowAll(!showAll)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => person.name.includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        adding={addFilter}
        filter={newFilter}
        handleFilter={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        adding={addPerson}
        personName={newName}
        handleName={handleNameChange}
        personNumber={newNumber}
        handleNumber={handleNumberChange} />

      <h2>Numbers</h2>
      {personsToShow.map(person =>
        <Persons
          key={person.name}
          name={person.name}
          number={person.number} />
      )}

    </div>
  )
}

export default App