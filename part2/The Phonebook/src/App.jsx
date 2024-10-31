import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDeleteEntry = id => {
    const nameToDelete = persons.filter(p => p.id === id)
    const message = `Delete ${nameToDelete[0].name} ?`
    if (confirm(message)) {
      personService
        .deleteEntry(id)
        .then(
          setPersons(persons.filter(p => p.id !== id))
        )
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let nameExists = persons.filter(person => personObject.name === person.name)

    if (nameExists === undefined) {
      personService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
        })
    } else {
      const message = `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      if (confirm(message)) {
        personService
          .update(nameExists[0].id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === nameExists[0].id ? returnedPerson : person))
          })
      }
    }
    setNewName('')
    setNewNumber('')
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
        handleFilter={handleFilterChange} />

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
          number={person.number}
          handleDelete={() => handleDeleteEntry(person.id)} />
      )}

    </div>
  )
}

export default App