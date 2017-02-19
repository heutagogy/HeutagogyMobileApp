import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Map } from 'immutable'

import { LoginForm, WelcomePage } from './../../components'
import { isLoggedIn } from './../../utils/userUtils'
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
    logout,
    savePage,
    authUser,
    meta,
  } = props

  return (
    <View style={styles.container}>
      { isLoggedIn(authUser)
        ? <WelcomePage logout={logout} savePage={savePage} meta={meta} />
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
  savePage: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    authUser: state.heutagogy.get('authUser'),
    meta: state.heutagogy.get('meta'),
  }),
  (dispatch) => ({
    login: (loginInfo) => dispatch(actions.login(loginInfo)),
    logout: () => dispatch(actions.logout()),
    savePage: (url, title) => dispatch(actions.savePage(url, title)),
  })
)(App)
