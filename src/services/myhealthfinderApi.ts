import axios from 'axios'

const myhealthfinderApi = axios.create({
  baseURL: 'https://health.gov/myhealthfinder/api/v3'
})

export default myhealthfinderApi
