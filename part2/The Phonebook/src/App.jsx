import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [infoMessage, setMessage] = useState('')
  const [messageClass, setClass] = useState('')

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
          setPersons(persons.filter(p => p.id !== id)))
        .then(() => {
          setClass('success')
          setMessage(
            `${nameToDelete[0].name} was removed`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    let nameExists = persons.filter(person => personObject.name === person.name)

    if (nameExists.length <= 0) {
      personService
        .create(personObject)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
        })
        .then(() => {
          setClass('success')
          setMessage(
            `${personObject.name} was added`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    } else {
      const message = `${personObject.name} is already added to phonebook, replace the old number with a new one?`
      if (confirm(message)) {
        personService
          .update(nameExists[0].id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id === nameExists[0].id ? returnedPerson : person))
          })
          .then(() => {
            setClass('success')
            setMessage(
              `${personObject.name} was updated`
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
          .catch(error => {
            setClass('error')
            setMessage(`Information of ${personObject.name} has already been removed`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
            personService
              .getAll()
              .then(initialPersons => {
                setPersons(initialPersons)
              })
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
      <Notification message={infoMessage} classType={messageClass} />
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