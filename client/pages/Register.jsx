import React from 'react';
import apollo from '/client/apollo.js';
import { loginWithPassword, createUser } from 'meteor-apollo-accounts';
import SimpleSchema from 'simpl-schema';
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification'

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  async onSubmit({ name, email, password }) {
    const { history } = this.props;

    try {
      await createUser({ email, password, profile: {name} }, apollo);
      history.push('/dashboard');
      notification.open({
        message: 'Log in successful',
      })
    } catch (error) {
      notification.open({
        message: 'Error',
        description: 'Username or password incorrect'
      })
    }
  }

  render() {
    return (
      <div>
        <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit.bind(this)}>
          <AutoField name='name' placeholder="Enter your name" label={false} />
          <AutoField name='email' placeholder="Enter your email address" label={false} />
          <AutoField name='password' placeholder="Password" label={false} type='password' />

          <Button type="primary" htmlType="submit">Login</Button>
          <a href="/forgot-password">Forgot password?</a>

          <ErrorField name="name" />
          <ErrorField name="email" />
          <ErrorField name="password" />
        </AutoForm>
      </div>
    )
  }
}

const RegisterSchema = new SimpleSchema({
  name: {
    type: String,
  },
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: { type: String }
});

export default Register;