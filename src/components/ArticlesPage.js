import React, { Component } from 'react'
import { Button, Text, View, ScrollView, StyleSheet, Linking } from 'react-native'
import { RNSKBucket } from 'react-native-swiss-knife'
import { fromJS } from 'immutable'

import { GROUP } from '../modules/app/constants'

import { ListItem, Subheader, Toolbar } from 'react-native-material-ui/src';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
  },
});

export default class ArticlesPage extends Component { // eslint-disable-line
  componentDidMount = () => {
    RNSKBucket.set('server', this.props.meta.get('server'))
    RNSKBucket.set('token', this.props.authUser.get('access_token'))

    this.props.fetchArticles()
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
        <ScrollView style={styles.container}>
          {this.props.articles.map((article) => (
          <ListItem
            key={article.get('id')}
            divider
            centerElement={article.get('title')}
            onPress={() => Linking.openURL(article.get('url'))}
          />))}
        </ScrollView>
      </View>
    )
  }
}
