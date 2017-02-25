/* eslint-disable fp/no-mutation */
import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'

import { LoginForm, WelcomePage } from './../../components'
import { isLoggedIn } from './userUtils'
import * as actions from './actions'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    logout,
    authUser,
    meta,
  } = props

  return (
    <View style={styles.container}>
      { isLoggedIn(authUser)
        ? <WelcomePage
          authUser={authUser}
          logout={logout}
          meta={meta}
        />
        : <LoginForm login={login} {...initialValues} /> }
    </View>
  )
}

App.displayName = 'Heutagogy'

//it is a good practice to always indicate what type of props does your component
//receive. This is really good for documenting and prevent you from a lot of bug during
//development mode. Remember, all of these will be ignored once you set it to production.
App.propTypes = {
  authUser: PropTypes.instanceOf(Map),
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
}

export default connect(
  (state) => {
    state = fromJS(state)

    return {
      authUser: state.getIn(['heutagogy', 'authUser']),
      meta: state.getIn(['heutagogy', 'meta']),
    }
  },
  (dispatch) => ({
    login: (loginInfo) => dispatch(actions.login(loginInfo)),
    logout: () => dispatch(actions.logout()),
  })
)(App)
