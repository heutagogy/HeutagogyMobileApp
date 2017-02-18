import React, { PropTypes } from 'react'
import { StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'

import { LoginForm } from './../../components'
import * as actions from './actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

const initialValues = {
  initialValues: {
    server: 'https://heutagogy.herokuapp.com',
  }
}

const App = (props) => {
  const {
    login,
  } = props

  return (
    <View style={styles.container}>
      <LoginForm login={login} {...initialValues} />
    </View>
  )
}

App.displayName = 'Heutagogy'

//it is a good practice to always indicate what type of props does your component
//receive. This is really good for documenting and prevent you from a lot of bug during
//development mode. Remember, all of these will be ignored once you set it to production.
App.propTypes = {
  login: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    authUser: state.heutagogy.get('authUser'),
  }),
  (dispatch) => ({
    login: (loginInfo) => dispatch(actions.login(loginInfo)),
  })
)(App)
