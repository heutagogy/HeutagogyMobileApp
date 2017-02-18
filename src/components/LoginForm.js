import React from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native'
import { Field, reduxForm } from 'redux-form/immutable'
import { connect } from 'react-redux'


const submit = (values) => console.log('submitting immutable form', values.toJS())

const renderInput = ({ input: { onChange, ...restInput }, secureTextEntry }) => {
  return <TextInput
    style={styles.input}
    onChangeText={onChange}
    secureTextEntry={Boolean(secureTextEntry)}
    {...restInput}
  />
}

const Form = (props) => {
  const { handleSubmit } = props

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Heutagogy</Text>
      </View>
      <View>
        <Text style={styles.label}>Username:</Text>
        <Field name="username" component={renderInput} />
      </View>
      <View>
        <Text style={styles.label}>Password:</Text>
        <Field name="password" component={renderInput} secureTextEntry />
      </View>
      <View>
        <Text style={styles.label}>Server address:</Text>
        <Field name="server" component={renderInput} />
      </View>
      <TouchableOpacity onPress={handleSubmit(submit)}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

const LoginFormWrapped = reduxForm({ form: 'LoginForm' })(Form)

const mapStateToProps = (state) => ({
  initialValues: {
    server: state.heutagogy.server,
  }
})

// it is connected just for filling server address with default value
export default connect(mapStateToProps, null)(LoginFormWrapped)

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  label: {
    fontSize: 20,
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
    padding: 10,
    minWidth: 250,
  },
  container: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },
  input: {
    borderColor: 'black',
    fontSize: 20,
    borderWidth: 1,
    height: 50,
    minWidth: 250
  }
})
