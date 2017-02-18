import { LOGIN } from './constants'

export const login = ({ username, password, serverAddress }) => {
  return {
    type: LOGIN,
    payload: {
      username,
    }
  }
}
