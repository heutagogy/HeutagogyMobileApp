import React, { Component } from 'react';
import { reduxForm } from 'redux-form/immutable';
import { ActionsContainer, Button, Form } from 'react-native-clean-form';
import { Input } from 'react-native-clean-form/redux-form-immutable';


const onSubmit = (values, dispatch) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(values.toJS())
      resolve()
    }, 1500)
  })
}

class FormView extends Component {
  render() {
    const { handleSubmit, submitting } = this.props

    return (
      <Form>
        <Input name="username" label="Username" placeholder="Drets" />
        <Input name="password" label="Password" placeholder="My secret password" />
        <Input name="server_address" label="Server address" placeholder="https://heutagogy.herokuapp.com" />
        <ActionsContainer>
          <Button onPress={handleSubmit(onSubmit)} submitting={submitting}>Submit</Button>
        </ActionsContainer>
      </Form>
    )
  }
}

export default reduxForm({ form: 'Form' })(FormView);
