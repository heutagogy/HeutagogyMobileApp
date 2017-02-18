import { LOGIN } from './constants'

export const login = ({ username, password, serverAddress }) => {
  console.log('inside');

  return {
    type: LOGIN,
    payload: {
      username,
    }
  }
}
