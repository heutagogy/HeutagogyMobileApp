import React, { Component } from 'react'
import ShareExtension from 'react-native-share-extension'
import { Text, View, StyleSheet } from 'react-native'
import { Dialog, DialogDefaultActions, ThemeProvider } from 'react-native-material-ui'
import { RNSKBucket } from 'react-native-swiss-knife'
import moment from 'moment'

import { GROUP, API_VERSION } from './src/modules/app/constants'


export default class Share extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      server: null, token: null, type: null, url: null,
      article: null,
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

    this.fetchArticleInfo(value)
  }

  async fetchArticleInfo(url) {
    // Token and server are not yet set into state because of
    // asynchronous nature of setState.
    const server = await RNSKBucket.get('server')
    const token = await RNSKBucket.get('token')

    if (!server || !token) {
      return
    }

    return fetch(`${server}/${API_VERSION}/bookmarks?url=${encodeURIComponent(url)}`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${token}`,
        'Accept': 'application/json',
      },
    }).then((response) => response.json()
    ).then((result) => this.setState({ article: result[0] || null }))
  }

  saveArticle() {
    return fetch(`${this.state.server}/${API_VERSION}/bookmarks`, {
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

  setRead(read) {
    return fetch(`${this.state.server}/${API_VERSION}/bookmarks/${this.state.article.id}`, {
      method: 'POST',
      headers: {
        'Authorization': `JWT ${this.state.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        read: (read ? moment().format() : null),
      }),
    })
  }

  deleteArticle() {
    return fetch(`${this.state.server}/${API_VERSION}/bookmarks/${this.state.article.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${this.state.token}`,
      },
    })
  }

  handleActionPress = (action) => {
    if (action === 'Cancel' || action === 'Close') {
      ShareExtension.close()
    } else if (action === 'Save') {
      this.saveArticle().then(
        () => ShareExtension.close(),
        () => ShareExtension.close())
    } else if (action === 'Read' || action === 'Unread') {
      this.setRead(action === 'Read').then(
        () => ShareExtension.close(),
        () => ShareExtension.close())
    } else if (action === 'Delete') {
      this.deleteArticle().then(
        () => ShareExtension.close(),
        () => ShareExtension.close())
    }
  }

  renderNoAuth = () => {
    return (
      <Dialog>
        <Dialog.Title>You are not authorized</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.msg}>Please, login into Heutagogy app </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <DialogDefaultActions
            actions={['Close']}
            onActionPress={this.handleActionPress}
          />
        </Dialog.Actions>
      </Dialog>)
  }

  renderSaveDialog = () => {
    return <Dialog>
        <Dialog.Title>Save bookmark</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.msg}>Do you want to save this link?</Text>
          <Text style={styles.url}>{this.state.url}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <DialogDefaultActions
            actions={['Cancel', 'Save']}
            onActionPress={this.handleActionPress}
          />
        </Dialog.Actions>
    </Dialog>
  }

  renderSavedDialog = () => {
    return <Dialog>
      <Dialog.Title>Saved bookmark</Dialog.Title>
      <Dialog.Content>
        <Text style={styles.msg}>{'The article is saved as'}</Text>
        <Text style={styles.title}>{this.state.article.title}</Text>
      </Dialog.Content>
      <Dialog.Actions>
        <DialogDefaultActions
          actions={['Cancel', 'Delete', (this.state.article.read ? 'Unread' : 'Read')]}
          onActionPress={this.handleActionPress}
        />
      </Dialog.Actions>
    </Dialog>
  }

  renderModal() {
    if (!this.state.server || !this.state.token) {
      return this.renderNoAuth();
    } else if (this.state.article) {
      return this.renderSavedDialog();
    } else {
      return this.renderSaveDialog();
    }
  }

  render() {
    return (
      <ThemeProvider uiTheme={{}}>
        <View style={styles.container}>
          {this.renderModal()}
        </View>
      </ThemeProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  msg: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    paddingTop: 16,
  },
  title: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  url: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
