import React, { Component } from 'react'
import Modal from 'react-native-modalbox'
import ShareExtension from 'react-native-share-extension'

import {
  Button,
  Text,
  View,
} from 'react-native'
import { RNSKBucket } from 'react-native-swiss-knife'

const myGroup = 'group.heutagogy'

export default class Share extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      isOpen: true,
      type: '',
      value: ''
    }
  }

  async componentDidMount() {
    try {
      const { type, value } = await ShareExtension.data()
      this.setState({
        type,
        value
      })
    } catch(e) {
      console.log('errrr', e)
    }
  }

  onClose() {
    ShareExtension.close()
  }

  closing = () => {
    this.setState({
      isOpen: false
    })
  }

  saving = () => {
    RNSKBucket.set('url', this.state.value, myGroup)
    this.closing();
  }

  render() {
    return (
      <Modal
        backdrop={false}
        style={{ backgroundColor: 'transparent' }}
        position="center"
        isOpen={this.state.isOpen}
        onClosed={this.onClose}
      >
        <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <View style={{ width: 300, height: 200, backgroundColor: 'white', justifyContent: 'space-around'}}>
            <Text style={{ color: 'black', textAlign: 'center', fontSize: 16 }}>Do you want to save the following link?</Text>
            <Text style={{ color: 'black', textAlign: 'center' }}>{ this.state.value }</Text>
            <View style={{ alignItems: 'flex-end', flexDirection: 'row', justifyContent: 'space-around'}}>
              <Button title="OK" onPress={this.saving} />
              <Button title="Cancel" onPress={this.closing}/>
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}
