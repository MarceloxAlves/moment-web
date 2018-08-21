
import axios from 'axios'
import { Loading } from 'quasar'

let loadFunction = config => {
  Loading.show()
  return config
}
let finishFunction = response => {
  Loading.hide()
  return response
}
let errorFunction = error => {
  Loading.hide()
  return Promise.reject(error)
}

const axiosMoment =
     axios.create({ baseURL: 'http://localhost:8081/' })
    // axios.create({ baseURL: 'https://moment-api-v1.herokuapp.com/' })

axiosMoment.interceptors.request.use(loadFunction)

axiosMoment.interceptors.response.use(finishFunction, errorFunction)

export default ({ Vue }) => {
  Vue.prototype.$http = axiosMoment
}

