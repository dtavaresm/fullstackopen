import ItemList from './ItemList'
import ForecastDetails from './ForecastDetails'

const Details = ({ details, forecastData }) => {
    return (
        <>
            <h2>
                {details.name.common}
            </h2>

            <p>
                Capital: {details.capital[0]}
            </p>
            <p>
                Area: {details.area}
            </p>
            <h4> Languages: </h4>
            <ul>
                {Object.values(details.languages).map(language =>
                    <ItemList key={language} item={language} showButton={false}/>
                )}
            </ul>
            <br />
            <img src={details.flags.png} alt={details.flags.alt} />
            <ForecastDetails data={forecastData} countryName={details.name.common}/>
        </>
    )
}

export default Details