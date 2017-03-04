import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import { LOGIN, LOGOUT, ARTICLES_LOADED, ARTICLE_CONTENT } from './constants'


const initialState = fromJS({
  authUser: fromJS({}),
  server: '',
})

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions({
  [LOGIN]: (state, action) => {
    const userData = action.payload.getIn(['entities', 'authUser'])
    const user = userData ? userData.toList().first() : fromJS({})

    const newState = state.set('authUser', user)
          .set('meta', fromJS({
            server: action.meta.server,
            username: action.meta.username
          }))

    return newState
  },
  [LOGOUT]: (state, action) => state.set('authUser', fromJS({})),
  [ARTICLES_LOADED]: (state, action) => {
    const articles = action.payload.get('result').map((id) => action.payload.getIn(['entities', 'articles', `${id}`]))

    return state.set('articles', articles)
  },
  [ARTICLE_CONTENT]: (state, action) => state.setIn(['content', `${action.meta.id}`], action.payload),
}, initialState)
