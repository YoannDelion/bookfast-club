import axios from 'axios'
import { USERS_API } from '../config'

const create = user => axios.post(USERS_API, user)

export default { create }