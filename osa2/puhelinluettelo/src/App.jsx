import { useState, useEffect } from 'react'
import personService from './services/persons'

const Person = ({ person, removePerson }) => <div>{person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button></div>

const Persons = ({ persons, nameFilter, removePerson }) => {
  const filterString = nameFilter.toLowerCase()
  return (
    <div>
      {persons.filter(person => person.name.toLowerCase().includes(filterString)).map(person => 
        <Person key={person.id} person={person} removePerson={removePerson} />
      )}
    </div>
  )
}

const Filter = ({ nameFilter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={nameFilter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, addNewPerson }) => {
  return (
    <form onSubmit={addNewPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='notification'>
      {message}
    </div>
  )
}

const ErrorMessage = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setNameFilter(event.target.value)

  const addNewNotification = message => {
    setMessage(message)
    
    setTimeout(() => {
      setMessage(null)
    }, 4000)
  }

  const addNewErrorMessage = message => {
    setErrorMessage(message)

    setTimeout(() => {
      setErrorMessage(null)
    }, 4000)
  }

  const addNewPerson = (event) => {
    event.preventDefault()

    const personInd = persons.findIndex(person => person.name === newName)

    if (personInd !== -1) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {

        const updatedPerson = { ...persons[personInd], number: newNumber }

        personService
          .update(updatedPerson.id, updatedPerson)
          .then(data => {
            setNewName('')
            setNewNumber('')

            addNewNotification(`Changed information of ${data.name}`)
          })
          .catch(error => {
            addNewErrorMessage(`Information of ${updatedPerson.name} has been removed from server`)
          })
      }
      return
    }

    const newPerson = {
      name: newName,
      number: newNumber,
    }

    personService
      .create(newPerson)
      .then(data => {
        setPersons(persons.concat(data))
        setNewName('')
        setNewNumber('')

        addNewNotification(`Added ${data.name}`)
      })
  }

  const removePerson = (person) => {
    if (confirm(`Delete ${person.name} ?`)) {
      personService
        .remove(person.id)
        .then(data => {
          setPersons(persons.filter(currentPerson => currentPerson.id !== person.id))

          addNewNotification(`Deleted ${person.name}`)
        })
        .catch(error => {
          addNewErrorMessage(`Information of ${person.name} has already been removed from server`)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorMessage message={errorMessage} />

      <Filter nameFilter={nameFilter} handleFilterChange={handleFilterChange} />

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} newNumber={newNumber} 
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} addNewPerson={addNewPerson} 
      />
      
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={nameFilter} removePerson={removePerson} />
    </div>
  )
}

export default App