import { LOGIN, LOGIN_FAILED, LOGOUT, ARTICLES_LOADED, API_VERSION } from './constants'
import { normalize } from 'normalizr'
import { fromJS } from 'immutable'

import authUserSchema from './authUserSchema'
import articlesSchema from './articlesSchema'


export const login = ({ username, password, server }) => {
  return (dispatch) => fetch(`${server}/${API_VERSION}/login`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password }),
  }).then(
    response => response.json()
  ).then(
    json => {
      if (json.status_code) {
        return dispatch({ type: LOGIN_FAILED, json })
      }

      return dispatch({
        type: LOGIN,
        meta: { username, server },
        payload: fromJS(normalize(json, authUserSchema))
      })
    },
    err => dispatch({ type: LOGIN_FAILED, err })
  );
}

export const logout = () => (dispatch) => (dispatch({ type: LOGOUT }))

export const fetchArticles = () => (dispatch, getStore) => {
  const store = fromJS(getStore())
  const server = store.getIn(['heutagogy', 'meta', 'server'])
  const token = store.getIn(['heutagogy', 'authUser', 'access_token'])

  fetch(`${server}/${API_VERSION}/bookmarks?per_page=2000`, {
    method: 'GET',
    headers: {
      'Authorization': `JWT ${token}`,
      'Accept': 'application/json',
    },
  }).then((response) => response.json()
  ).then((json) => {
    dispatch({
      type: ARTICLES_LOADED,
      payload: fromJS(normalize(json, articlesSchema))
    })
  })
}
