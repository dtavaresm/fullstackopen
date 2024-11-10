import { useState, useEffect } from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import ItemList from './components/ItemList'
import Details from './components/Details'

function App() {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [newForecast, setForecast] = useState(null)

  let countriesToFilter = []

  const allCountries = () => {
    countryService
      .getAll()
      .then(initialCountries => {
        countriesToFilter = initialCountries.map(iC => iC)
      })
      .then(() => countriesToFilter)
  }

  useEffect(() => {
    allCountries()
  })

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    const filter = event.target.value
    let filteredCountries = countriesToFilter.filter(f => f.name.common.toLowerCase().indexOf(filter.toLowerCase()) >= 0)

    if (filteredCountries.length > 1) {
      setCountries(filteredCountries)
    }
    else if (filteredCountries[0] != undefined) {
      countryService
        .getFiltered(filteredCountries[0])
        .then(result => setCountries(result))
      weatherService
        .getForecast(filteredCountries[0].latlng[0], filteredCountries[0].latlng[1])
        .then(forecast => {
          setForecast(forecast)
        })
    }
    else if (filteredCountries[0] === undefined) {
      setCountries(filteredCountries)
    }
  }

  const handleShow = (countryName) => {
    let filteredCountries = countriesToFilter.filter(f => f.name.common === countryName)
    countryService
      .getFiltered(filteredCountries[0])
      .then(result => setCountries(result))
    weatherService
      .getForecast(filteredCountries[0].latlng[0], filteredCountries[0].latlng[1])
      .then(forecast => {
        setForecast(forecast)
      })
  }

  const Display = ({ countries }) => {
    if (countries.length >= 1 && countries.length < 10) {
      let show = true;
      return (
        <ul>
          {countries.map(country =>
            <ItemList
              key={country.name.common}
              item={country.name.common}
              showButton={show}
              handleClick={handleShow} />
          )}
        </ul>
      )
    }
    else if (countries.length > 10) {
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
    }
    else {
      if (countries.name != undefined) {
        return (
          <>
            <Details details={countries} forecastData={newForecast} />
          </>
        )
      }
      else {
        return (
          <p>
            No matches, specify another filter
          </p>
        )
      }
    }
  }

  return (
    <>
      <p>Find countries</p>

      <input value={newFilter} onChange={handleFilterChange} />

      <Display countries={countries} />
    </>
  )
}

export default App
