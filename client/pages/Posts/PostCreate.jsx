import React, {Component} from 'react';
import SimpleSchema from "simpl-schema";
import { AutoForm, AutoField, ErrorField } from 'uniforms-antd';
import db from 'apollo-morpher';

class PostCreate extends Component {

  onSubmit = data => {
    const newData = {
      ...data,
      userId: Meteor.userId()
    };

    db.posts.insert(newData)
      .then(id => {
        if (id) {
          console.log(id);
          //do smth
        } else {
          // error
        }
    });
  }

  render() {
    return (
      <div>
        <AutoForm schema={PostSchema} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const PostSchema = new SimpleSchema({
  title: {
    type: String,
  },
  description: { type: String },
  tags: { type: Array },
  'tags.$': { type: String },
});

export default PostCreate;