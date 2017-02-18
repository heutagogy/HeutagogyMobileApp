import { AppRegistry } from 'react-native'
import Main from './src'
import Share from './share.android'

AppRegistry.registerComponent('HeutagogyMobileApp', () => Main)
AppRegistry.registerComponent('MyShareEx', () => Share)
