import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as form } from 'redux-form/immutable'
import { fromJS } from 'immutable'
import thunk from 'redux-thunk';

import { app } from './modules'


const middleware = applyMiddleware(thunk);

export default (data = {}) => {
  const rootReducer = combineReducers({
    form,
    [app.NAME]: app.reducer
  })

  return createStore(rootReducer, data, middleware)
}
