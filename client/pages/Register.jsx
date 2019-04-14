import React from 'react';
import apollo from '/client/apollo.js';
import { loginWithPassword, createUser } from 'meteor-apollo-accounts';
import SimpleSchema from 'simpl-schema';
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification'
import Wrapper from '../components/Wrapper';
import WorkDefault from "../components/svg/imgs/WorkDefault";

class Register extends React.Component {
  constructor(props) {
    super(props);
  }

  async onSubmit({ name, role, email, password }) {
    const { history } = this.props;

    let userRole = role === false || role === undefined || role === 0 ? 'STUDENT' : "SECRETAR";

    try {
      const id = await createUser({ email, password,  profile: { name, role: userRole} }, apollo);

      if (userRole === 'STUDENT') {
        history.push(`/complete-info/${id}`);
      }  else if (userRole === 'SECRETAR') {
        history.push('/profile');
      }
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
      <Wrapper>
        <section className="register">

          <div className="register__image">
            <WorkDefault className="register__image--img" />
          </div>

          <div className="register__content">
            <div className="register__content__title">Create an account</div>
            <AutoForm schema={RegisterSchema} onSubmit={this.onSubmit.bind(this)}>
              <div>
                <AutoField name='name' placeholder="Enter your firstname" label={"Enter your name"} />
              </div>
              <AutoField name='email' placeholder="Enter your email address" label={"Enter your email"} />
              <AutoField name='password' placeholder="Password" label={"Password"} type='password' />
              <AutoField name='role' placeholder="Password" label={"Secretar"} />
              <Button type="primary" htmlType="submit">Register</Button>
              <br/>
              <br/>
              <a href="/forgot-password">Forgot password?</a>

              <ErrorField name="name" />
              <ErrorField name="email" />
              <ErrorField name="password" />
              </AutoForm>
          </div>
        </section>
      </Wrapper>
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
  role: {
    type: Boolean,
    optional: true,
  },
  password: { type: String }
});

export default Register;