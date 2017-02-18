import { handleActions } from 'redux-actions'
import { fromJS } from 'immutable'

import { LOGIN } from './constants'


const initialState = {
  authUser: fromJS({}),
  server: '',
}

//you can do better here, I was just showing that you need to make a new copy
//of state. It is ok to deep copy of state. It will prevent unseen bugs in the future
//for better performance you can use immutableJS

//handleActions is a helper function to instead of using a switch case statement,
//we just use the regular map with function state attach to it.

export default handleActions({
  [LOGIN]: (state, action) => {
    console.log(JSON.stringify(action, null, 2));

    return {
      ...state,
    }
  },
}, initialState)
