import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Field, reduxForm } from 'redux-form/immutable'
import TextField from 'react-native-md-textinput'
import { Button } from 'react-native-material-ui'
import { connect } from 'react-redux'
import { toJS } from 'immutable'

const styles = {
  title: {
    fontSize: 40,
  },
  container: {
    alignSelf: 'stretch',
    padding:32,
  },
  submit: {
    width: 200,
    alignSelf: 'center',
    marginTop: 24,
  },
}

const renderInput = ({ input: { onChange, ...restInput }, secureTextEntry, label}) => {
  return <TextField
    label={label}
    height={40}
    onChangeText={onChange}
    secureTextEntry={Boolean(secureTextEntry)}
    {...restInput}
  />
}

const Form = (props) => {
  const { handleSubmit, login } = props

  const submit = (values) => {
    login(values.toJS())
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Heutagogy</Text>
      <Field name="username" component={renderInput} label="Login" />
      <Field name="password" component={renderInput} label="Password" secureTextEntry />
      <Field name="server" component={renderInput} label="Server address" />
      <View style={styles.submit}>
        <Button raised primary text="Submit" onPress={handleSubmit(submit)} />
      </View>
    </ScrollView>
  )
}

export default reduxForm({ form: 'LoginForm' })(Form)
