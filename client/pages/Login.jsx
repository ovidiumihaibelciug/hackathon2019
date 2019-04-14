import React from 'react';
import apollo from '/client/apollo.js';
import {loginWithPassword} from 'meteor-apollo-accounts';
import SimpleSchema from 'simpl-schema';
import {AutoField, AutoForm, ErrorField} from 'uniforms-antd';
import Button from 'antd/lib/button';
import notification from 'antd/lib/notification'
import Wrapper from "../components/Wrapper";
import WorkDefault from "../components/svg/imgs/WorkDefault";
import {Link} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  async onSubmit({email, password}) {
    const {history} = this.props;

    try {
      await loginWithPassword({email, password}, apollo);
      history.push('/profile');
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
            <WorkDefault className="register__image--img"/>
          </div>

          <div className="register__content">
            <div className="register__content__title">Login</div>
            <AutoForm schema={LoginSchema} onSubmit={this.onSubmit.bind(this)}>
              <AutoField name='email' placeholder="Enter your email address" label={false}/>
              <AutoField name='password' placeholder="Password" label={false} type='password'/>

              <Button type="primary" htmlType="submit">Login</Button>
              <br/>
              <br/>
              <a href="/forgot-password">Forgot password?</a>
              <br/>
              <Link to="/register">Register</Link>

              <ErrorField name="email"/>
              <ErrorField name="password"/>
            </AutoForm>
          </div>
        </section>
      </Wrapper>
    )
  }
}

const LoginSchema = new SimpleSchema({
  email: {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  password: {type: String}
});

export default Login;