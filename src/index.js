import React from 'react'
import { Provider } from 'react-redux'

import { app } from './modules'
import { store, load } from './createStore'


load(store).then((newState) => console.log('Loaded state:', newState))

const Main = () => {
  return (
    <Provider store={store}>
      <app.App />
    </Provider>
  )
}

export default Main
