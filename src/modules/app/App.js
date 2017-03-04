/* eslint-disable fp/no-mutation */
import React, { PropTypes } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { connect } from 'react-redux'
import { Map, fromJS } from 'immutable'

import { LoginForm, ArticlesPage } from './../../components'
import { isLoggedIn } from './userUtils'
import * as actions from './actions'

import { COLOR, ThemeProvider } from 'react-native-material-ui';

const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

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
    fetchArticles,
    authUser,
    meta,
    articles,
  } = props

  return (
    <ThemeProvider uiTheme={uiTheme}>
      <View style={styles.container}>
        { isLoggedIn(authUser)
          ? <ArticlesPage
              authUser={authUser}
              logout={logout}
              meta={meta}
              fetchArticles={fetchArticles}
              articles={articles}
            />
          : <LoginForm login={login} {...initialValues} /> }
      </View>
    </ThemeProvider>
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
  fetchArticles: PropTypes.func.isRequired,
}

export default connect(
  (state) => {
    state = fromJS(state)

    return {
      authUser: state.getIn(['heutagogy', 'authUser']),
      meta: state.getIn(['heutagogy', 'meta']),
      articles: state.getIn(['heutagogy', 'articles'], fromJS([])),
    }
  },
  (dispatch) => ({
    login: (loginInfo) => dispatch(actions.login(loginInfo)),
    logout: () => dispatch(actions.logout()),
    fetchArticles: () => dispatch(actions.fetchArticles()),
  })
)(App)
