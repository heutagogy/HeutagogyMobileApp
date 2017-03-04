/* eslint-disable fp/no-mutation */
import React, { Component } from 'react'
import { Button, Navigator, Text, View, ListView, RefreshControl, StyleSheet, Linking, WebView, BackAndroid } from 'react-native'
import { RNSKBucket } from 'react-native-swiss-knife'
import { fromJS } from 'immutable'

import { GROUP } from '../modules/app/constants'

import { ListItem, Subheader, Toolbar } from 'react-native-material-ui/src';
import { COLOR } from 'react-native-material-ui';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

let navigator;
BackAndroid.addEventListener('hardwareBackPress', () => {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
});

export default class ArticlesPage extends Component { // eslint-disable-line
  constructor(props) {
    super(props)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.state = {
      articlesDataSource: ds.cloneWithRows(props.articles.toJS()),
    }
  }

  componentDidMount = () => {
    RNSKBucket.set('server', this.props.meta.get('server'))
    RNSKBucket.set('token', this.props.authUser.get('access_token'))

    this.props.fetchArticles()
  }

  componentWillReceiveProps = (nextProps) => {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    })

    this.setState({
      articlesDataSource: ds.cloneWithRows(nextProps.articles.toJS()),
    })
  }

  logout = () => {
    RNSKBucket.remove('server')
    RNSKBucket.remove('token')

    this.props.logout()
  }

  handleMenuPress = ({ action, result, index }) => {
    if (action === 'menu' && result === 'itemSelected') {
      switch (index) {
        case 0:
          this.logout()
      }
    }
  }

  renderRow = (navigator) => (article) => {
    const offlineContent = this.props.offlineArticles.get(`${article.id}`)

    const style = {
      rightElement: {
        color: offlineContent ? COLOR.blue200 : COLOR.grey500,
      },
    }

    return (<ListItem
      key={article.id}
      divider
      centerElement={article.title}
      onPress={() => Linking.openURL(article.url)}
      rightElement="save"
      style={style}
      onRightElementPress={() =>
        offlineContent ? navigator.push({ type: 'article', id: article.id }) : this.props.saveOffline(article.id)}
    />)
  }

  renderScene = (route, navigator) => {
    if (route.type === 'list') {
      return <ListView
        style={styles.container}
        dataSource={this.state.articlesDataSource}
        renderRow={this.renderRow(navigator)}
        refreshControl={
          <RefreshControl
            onRefresh={this.props.fetchArticles}
            refreshing={false}
          />}
      />
    } else {
      const content = this.props.offlineArticles.get(`${route.id}`)

      // some css to make page beautiful
      const css = `
        <style type="text/css">
          body {
            margin: 40px auto;
            max-width: 650px;
            line-height: 1.6;
            font-size: 18px;
            color: #444;
            padding: 0 10px
          }

          h1,h2,h3 {
            line-height: 1.2
          }

          img {
            max-width: 100%;
            height: auto;
          }
        </style>
      `;

      return <WebView
        source={{ html: `${css} ${content.get('html')}` }}
        scalesPageToFit
      />
    }
  }

  render() {
    const { meta } = this.props

    return (
      <View style={styles.container}>
        <Toolbar
          centerElement="Heutagogy"
          rightElement={{
            menu: {
              labels: [
                'Log out',
              ],
            },
          }}
          onRightElementPress={this.handleMenuPress}
        />
        <Navigator
          ref={(nav) => { navigator = nav }}
          initialRoute={{ type: 'list' }}
          renderScene={this.renderScene}
        />
      </View>
    )
  }
}
