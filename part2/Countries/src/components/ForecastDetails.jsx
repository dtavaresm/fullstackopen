const ForecastDetails = ({ data, countryName }) => {
    if(data !== null) {
        let iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        let celsius = data.main.temp - 273.15
        return (
            <>
                <h3>
                    Weather in {countryName}
                </h3>
                <p>
                    Temperature {celsius.toFixed(2)} Celsius
                </p>
                <img src={iconUrl} />
                <p>
                    Wind {data.wind.speed} m/s
                </p>
            </>
        )
    }
  }

export default ForecastDetails