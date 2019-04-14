import React, {Component} from 'react';
import SimpleSchema from "simpl-schema";
import {AutoForm} from 'uniforms-antd';
import db from 'apollo-morpher';
import Navbar from "../components/Navbar";
import notification from 'antd/lib/notification'


class SuppliesCreate extends Component {

  state = {
    pdf: '',
    type: '',
    editorState: '',
  };

  onSubmit = async data => {
    const newData = {
      ...data,
      userId: Meteor.userId()
    };

    db.supplies.insert(newData)
      .then(id => {
        if (id) {
          const {history} = this.props;
          history.push('/supplies');
          notification.open({
            message: 'Supply added',
          })
        } else {
          // error
        }
      });
  };

  render() {
    const {type, editorState} = this.state;
    return (
      <div>
        <Navbar className="navbar__white"/>
        <div className="box supply-main__form">
          <h3>Add Supply</h3>
          <AutoForm schema={DocumentSchema} onSubmit={this.onSubmit}/>
        </div>
      </div>
    );
  }
}

const DocumentSchema = new SimpleSchema({
  title: {
    type: String,
  },
  tags: {type: Array},
  'tags.$': {type: String},
  description: {type: String}
});

export default SuppliesCreate;