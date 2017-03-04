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

  render() {
    const { meta } = this.props

    return (
      <View style={styles.container}>
        <Toolbar centerElement="Heutagogy"/>
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
      // <View style={{ alignItems: 'center' }}>
      //   <Text style={{ fontSize: 20, color: 'black' }}>Welcome { this.props.meta.get('username') }!</Text>
      //   <Text style={{ fontSize: 20, color: 'black', margin: 20, textAlign: 'center' }}>
      //     Use "Share..." option in Google Chrome to save an article to Heutagogy.
      //   </Text>
      //   <Button title="LOGOUT" onPress={this.logout} />
      // </View>
    )
  }
}
