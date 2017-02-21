import { AppRegistry } from 'react-native'
import Main from './src'
import Share from './share.android'

AppRegistry.registerComponent('Heutagogy', () => Main)
AppRegistry.registerComponent('HeutagogyShare', () => Share)
