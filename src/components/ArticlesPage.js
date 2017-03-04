/* eslint-disable fp/no-mutation */
import React, { Component } from 'react'
import { Button, Text, View, ListView, RefreshControl, StyleSheet, Linking } from 'react-native'
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

  renderRow = (article) => {
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
      onRightElementPress={() => this.props.saveOffline(article.id)}
    />)
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
        <ListView
          style={styles.container}
          dataSource={this.state.articlesDataSource}
          renderRow={this.renderRow}
          refreshControl={
            <RefreshControl
              onRefresh={this.props.fetchArticles}
              refreshing={false}
            />}
        />
      </View>
    )
  }
}
