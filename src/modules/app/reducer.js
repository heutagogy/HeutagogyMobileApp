import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import { LOGIN } from './constants'


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
      .set('server', action.meta.server)
      .set('username', action.meta.username)

    console.log(JSON.stringify(newState, null, 2))

    return newState
  },
}, initialState)
