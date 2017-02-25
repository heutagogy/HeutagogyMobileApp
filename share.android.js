import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'
import { Button, Text, View, StyleSheet } from 'react-native'
import { RNSKBucket } from 'react-native-swiss-knife'
import moment from 'moment'

import { GROUP, API_VERSION } from './src/modules/app/constants'


export default class Share extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      isOpen: true,
      server: null, token: null, type: null, url: null,
    }
  }

  async componentWillMount() {
    const server = await RNSKBucket.get('server')
    const token = await RNSKBucket.get('token')

    this.setState({ server, token })
  }

  async componentDidMount() {
    const { value } = await ShareExtension.data()

    this.setState({ url: value })
  }

  onClose() {
    ShareExtension.close()
  }

  closing = () => {
    this.setState({ isOpen: false })
  }

  saveArticle() {
    fetch(`${this.state.server}/${API_VERSION}/bookmarks`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.state.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.state.url,
        timestamp: moment().format(),
      }),
    })
  }

  saving = () => {
    this.saveArticle()
    this.closing()
  }

  render() {
    return (
      <Modal
        backdrop={false}
        style={styles.modal}
        position="center"
        isOpen={this.state.isOpen}
        onClosed={this.onClose}
      >
        <View style={styles.wrapper}>
         { !this.state.server || !this.state.token
         ? <View style={styles.loginContainer}>
             <Text style={styles.msg}>Please, login into Heutagogy app </Text>
             <View style={styles.buttons}>
               <Button title="CLOSE" onPress={this.closing} />
             </View>
           </View>
         : <View style={styles.container}>
             <Text style={styles.url}>{ this.state.url }</Text>
             <Text style={styles.msg}>Do you want to save this link?</Text>
             <View style={styles.buttons}>
               <View style={styles.button}>
                 <Button title="CANCEL" onPress={this.closing} />
               </View>
               <View style={styles.button}>
                 <Button title="SAVE" onPress={this.saving} />
               </View>
             </View>
           </View>}
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: 200,
    justifyContent: 'space-around',
    padding: 10,
    width: 300,
  },
  loginContainer: {
    backgroundColor: 'white',
    height: 130,
    justifyContent: 'space-around',
    padding: 10,
    width: 300,
  },
  msg: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
  },
  url: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modal: {
    backgroundColor: 'transparent',
  },
  wrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  buttons: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 7,
  },
})
