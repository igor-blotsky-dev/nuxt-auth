import {
  getCookie
} from '../helpers/cookie.js'

export const processToken = () => {
  const token = getCookie('jwt auth')
  if (!token) throw new Error('no token provided')
  localStorage.setItem('accessToken', token)
}

export const isAuthorised = () => !!localStorage.getItem('accessToken')
