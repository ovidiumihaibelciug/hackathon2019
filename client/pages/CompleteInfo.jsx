import React, {Component} from 'react';
import SimpleSchema from "simpl-schema";
import {AutoForm} from "uniforms-antd";
import db from 'apollo-morpher';
import { loginWithPassword } from 'meteor-apollo-accounts';
import apollo from "../apollo";


class CompleteInfo extends Component {

  state = {
    user: ''
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    const fields = {
      _id: 1,
      createdAt: 1,
      emails: 1,
      services: {
        password: {
          bcrypt: 1,
        }
      },
      roles: 1,
      profile: {
        name: 1,
        role: 1,
        classNumber: 1,
        classLetter: 1,
        classTeacher: 1,
      }
    };
    db.users
      .findOne(fields, {
        filters: { _id: id },
      })
      .then(result => this.setState({ user: result }));
  }

  onSubmit = (data) => {
    const { id } = this.props.match.params;
    const { user } = this.state;
    const { history } = this.props;
    const newData = {
      ...user,
      roles: [user.profile.role],
      profile: {
        ...user.profile,
        classNumber: data.class_nr,
        classLetter: data.class_letter,
        classTeacher: data.diriginte,
      }
    };

    db.users.update({
      _id: id
    }, newData).then( () => {
      history.push('/login');
    });
    history.push('/login');
  };
  render() {
    return (
      <div className="complete-info">
        <div className="complete-info__box box">
          <AutoForm schema={CompleteInfoSchema} onSubmit={this.onSubmit.bind(this)} />
        </div>
      </div>
    );
  }
}

const CompleteInfoSchema = new SimpleSchema({
  class_nr: {
    type: String,
  },
  class_letter: {
    type: String,
  },
  diriginte: {
    type: String,
    defaultValue: ['a', 'b', 'c'],
    allowedValues: ['a', 'b', 'c'],
  },
  'diriginte.$': {
    type: String
  }
});

export default CompleteInfo;