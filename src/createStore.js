import { createStore, applyMiddleware, combineReducers } from 'redux'
import { reducer as form } from 'redux-form/immutable'
import thunk from 'redux-thunk'
import { app } from './modules'

import createEngine from 'redux-storage-engine-reactnativeasyncstorage'
import merger from 'redux-storage-merger-immutablejs'
import * as storage from 'redux-storage'

const reducer = storage.reducer(
  combineReducers({
    form,
    [app.NAME]: app.reducer
  }),
  merger
)

const engine = createEngine('heutagogy-store')
const middleware = storage.createMiddleware(engine)
const createStoreWithMiddleware = applyMiddleware(thunk, middleware)(createStore)

export const store = createStoreWithMiddleware(reducer)
export const load = storage.createLoader(engine)
