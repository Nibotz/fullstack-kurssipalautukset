import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY


const getWeatherData = (latlng) => {
  const request = axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${api_key}`)
  return request.then(response => response.data.current)
}


const Country = ({ country, weatherData }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital: {country.capital}</div>
      <div>area: {country.area}</div>
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt}></img>
      <h2>Weather in {country.capital}</h2>
      <div>temperature: {weatherData.temp} Celsius</div>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}></img>
      <div>wind: {weatherData.wind_speed} m/s</div>
    </div>
  )
}


const CountryList = ({ countries, filter, setCountry, cachedCountry, weatherData }) => {
  if (countries === null) {
    return null
  }

  const filterString = filter.toLowerCase()
  const visibleCountries = countries.filter(country => country.name.common.toLowerCase().includes(filterString))

  if (visibleCountries.length == 0) {
    return (
      <div>
        No matches
      </div>
    )
  }
  if (visibleCountries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  if (visibleCountries.length > 1) {
    return (
      <div>
        {visibleCountries.map(country => 
          <div key={country.name.common}>
            {country.name.common}
            <button onClick={() => setCountry(country)}>show</button>
          </div>
        )}
      </div>
    )
  }

  const newCountry = visibleCountries[0]

  if (weatherData === null || cachedCountry !== newCountry.name.common) {
    setCountry(newCountry)
    return null
  }
  return <Country country={newCountry} weatherData={weatherData} />
}


const App = () => {
  const [countries, setNewCountries] = useState(null)
  const [filter, setNewFilter] = useState('')
  const [cachedCountry, setNewCachedCountry] = useState('') // optional feature...
  const [weatherData, setNewWeatherData] = useState(null)

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setNewCountries(response.data)
      })
  }, [])

  const handleFilterChange = event => setNewFilter(event.target.value)

  const setCountry = (newCountry) => {
    const countryName = newCountry.name.common

    if (countryName !== cachedCountry) {
      getWeatherData(newCountry.latlng).then(data => {
        setNewFilter(countryName)
        setNewCachedCountry(countryName)
        setNewWeatherData(data)
      })
    }
    else {
      setNewFilter(countryName)
    }
  }

  return (
    <>
      <div>
        find countries
        <input onChange={handleFilterChange}></input>
      </div>
      <CountryList countries={countries} filter={filter} setCountry={setCountry} cachedCountry={cachedCountry} weatherData={weatherData} />
    </>
  )
}

export default App
