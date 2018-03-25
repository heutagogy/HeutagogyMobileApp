import React, { Component } from 'react'
import ShareExtension from 'react-native-share-extension'
import { ActivityIndicator, Text, View, StyleSheet } from 'react-native'
import { Dialog, DialogDefaultActions, ThemeProvider } from 'react-native-material-ui'
import { RNSKBucket } from 'react-native-swiss-knife'
import moment from 'moment'

import { GROUP, API_VERSION } from './src/modules/app/constants'


export default class Share extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      initializing: true, fetching: false,
      server: null, token: null, type: null, url: null,
      article: null,
    }

    this.saveArticle = this.saveArticle.bind(this);
    this.deleteArticle = this.deleteArticle.bind(this);
    this.setRead = this.setRead.bind(this);
  }

  async componentWillMount() {
    const server = await RNSKBucket.get('server')
    const token = await RNSKBucket.get('token')

    this.setState({ server, token, initializing: false })
  }

  async componentDidMount() {
    const { value } = await ShareExtension.data()

    this.setState({ url: value, fetching: true })

    this.fetchArticleInfo(value).finally(() => this.setState({ fetching: false }));
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
    const close = ShareExtension.close;
    const closeOn = (action, param) => action(param).then(close, close);

    switch (action) {
      case 'Cancel':
      case 'Close':
        close();
        break;
      case 'Save':
        closeOn(this.saveArticle);
        break;
      case 'Read':
      case 'Unread':
        closeOn(this.setRead, action === 'Read');
        break;
      case 'Delete':
        closeOn(this.deleteArticle);
        break;
      default:
        console.error('Unknown action');
    }
  }

  renderLoading = () => {
    return (
      <Dialog>
        <Dialog.Title>Loading</Dialog.Title>
        <Dialog.Content>
          <ActivityIndicator size="large"/>
        </Dialog.Content>
        <Dialog.Actions>
          <DialogDefaultActions
            actions={['Close']}
            onActionPress={this.handleActionPress}
            />
        </Dialog.Actions>
      </Dialog>)
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
    if (this.state.initializing || this.state.fetching) {
      return this.renderLoading();
    } else if (!this.state.server || !this.state.token) {
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
