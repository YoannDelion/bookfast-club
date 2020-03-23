import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { LOGIN_API } from '../config'

/**
 * Requête HTTP d'authentification et stockage du token dans le localStorage et sur axios
 * @param {object}credentials
 */
const authenticate = credentials => {
    return axios.post(LOGIN_API, credentials)
      .then(response => response.data.token)
      .then(token => {
          //On stock le token dans localStorage
          window.localStorage.setItem('authToken', token)

          //On prévient axios qu'on a maintenant un header par défaut sur toutes nos futures requetes HTTP
          setAxiosToken(token)

          return true
      })
}

/**
 * Déconnexion et suppression du token dans le localStorage sur axios
 */
const logout = () => {
    window.localStorage.removeItem('authToken')
    delete axios.defaults.headers['Authorization']
}

/**
 * Positionne le token JMT sur axios
 * @param {string} token
 */
const setAxiosToken = token => {
    axios.defaults.headers['Authorization'] = `Bearer ${token}`
}

/**
 * Mise en place mlors du chargement de l'application
 */
const setup = () => {
    const token = window.localStorage.getItem('authToken')

    if (token) {
        const { exp: expiration } = jwtDecode(token)
        //* 1000 pour transformer secondes en millisecondes
        if (expiration * 1000 > new Date().getTime()) setAxiosToken(token)
    }
}

/**
 * Permet de savoir si on est authentifié ou pas
 * @returns {boolean}
 */
const isAuthenticated = () => {
    const token = window.localStorage.getItem('authToken')

    if (token) {
        const { exp: expiration } = jwtDecode(token)
        //* 1000 pour transformer secondes en millisecondes
        if (expiration * 1000 > new Date().getTime()) return true
    }
    return false
}

export default { authenticate, logout, setup, isAuthenticated }