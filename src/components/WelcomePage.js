import React, { Component } from 'react'
import TimerMixin from 'react-timer-mixin'
import moment from 'moment';
import reactMixin from 'react-mixin'
import { Button, Text, View } from 'react-native'
import { RNSKBucket } from 'react-native-swiss-knife'
import { fromJS } from 'immutable'

import { GROUP } from '../modules/app/constants'


async function getArticle() {
  const url = await RNSKBucket.get('url', GROUP)

  if (!url) {
    return fromJS({})
  }

  RNSKBucket.remove('url', GROUP)

  return fromJS({
    url,
    timestamp: moment().format(),
  })
}

export default class WelcomePage extends Component {
  componentDidMount = () => {
    this.setInterval(
      () => {
        getArticle().then((article) => {
          if (!article.isEmpty()) {
            this.props.savePage({
              article,
              server: this.props.meta.get('server'),
              token: this.props.authUser.get('access_token'),
            })
          }
        })
      },
      500
    );
  }

  render() {
    const { meta } = this.props

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Welcome { this.props.meta.get('username') }!</Text>
        <Text style={{ fontSize: 20, color: 'black', margin: 20, textAlign: 'center' }}>
          Use "Share..." option in Google Chrome to save an article to Heutagogy.
        </Text>
        <Button title="LOGOUT" onPress={this.props.logout} />
      </View>
    )
  }
}

reactMixin(WelcomePage.prototype, TimerMixin)
