import React from 'react'
import apollo from '/client/apollo.js';
import { forgotPassword } from 'meteor-apollo-accounts';
import SimpleSchema from 'simpl-schema';
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification'

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
  }

  async onSubmit({ email }) {
    try {
      await forgotPassword({ email }, apollo);
      notification.open({
        message: 'Reset link was sent',
        description: 'Check your email'
      })
    } catch (error) {
      notification.open({
        message: 'Error',
        description: 'Email is incorrect'
      })
    }
  }

  render() {
    return (
      <AutoForm schema={schema} onSubmit={this.onSubmit.bind(this)} >
        <AutoField name="email" label={false} placeholder="Enter your email address" />
        <Button htmlType="submit" > Send password reset link </Button>

        <ErrorField name="email" />
      </AutoForm>
    )
  }
}

const schema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  }
})

export default ForgotPassword;