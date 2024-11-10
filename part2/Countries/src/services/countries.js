import axios from "axios"
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"

const getAll = () => {
    const request = axios.get(baseUrl + 'api/all')
    return request.then((response) => response.data)
  }

const getFiltered = (filter) => {
    let filterValue = filter.name == undefined ? filter : filter.name.common
    const request = axios.get(baseUrl + '/api/name/' + filterValue)
    return request.then((response) => response.data)
  }

export default { getAll, getFiltered }

