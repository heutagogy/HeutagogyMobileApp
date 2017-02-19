import React, { Component } from 'react'
import { Button, Text, View } from 'react-native'


export default class WelcomePage extends Component {
  logout = () => {
    this.props.logout()
  }

  render() {
    const { meta } = this.props

    return (
      <View style={{ alignItems: 'center' }}>
        <Text style={{ fontSize: 20, color: 'black' }}>Welcome { this.props.meta.get('username') }!</Text>
        <Text style={{ fontSize: 20, color: 'black', margin: 20, textAlign: 'center' }}>
          Use "Share..." option in Google Chrome to save an article to Heutagogy.
        </Text>
        <Button title="LOGOUT" onPress={this.logout} />
      </View>
    )
  }
}
