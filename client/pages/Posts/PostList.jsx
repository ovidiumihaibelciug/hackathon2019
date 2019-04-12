import React, { Component, Fragment } from 'react';
import Post from './Post/Post';
import db from 'apollo-morpher';
import {Molecule} from "react-molecule";
import {
  EasyLoaderAgent,
  EasyLoadMoreAgent,
  EasyList,
  EasyLoadMore, EasyFilters,
} from 'easify';
import {AutoField, AutoForm} from "uniforms-antd";
import {Button} from "antd";
import SimpleSchema from "simpl-schema";

const load = ({ filters, options }) => db.posts.find(
  {
    _id: 1,
    title: 1,
    description: 1,
    tags: 1,
  },
  {
    filters,
    options,
  },
  {
    fetchPolicy: "no-cache",
  }
);

const count = filters => db.posts.count({
  filters,
  options: {},
});


class PostList extends Component {

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <Molecule
          agents={{
            loader: EasyLoaderAgent.factory({
              load,
            }),
          }}
        >
          <EasyFilters schema={FilterSchema}>
            {({ onSubmit }) => (
              <AutoForm onSubmit={onSubmit} schema={FilterSchema} autoComplete="off">
                <AutoField name="title" label="Search by name" />
                <AutoField name="description" label="Filter by area of law" />
                <Button type="primary" htmlType="submit">Filter</Button>
              </AutoForm>
            )}
          </EasyFilters>
          <EasyList>
            {({ data, loading, molecule }) => {
              return data.map(item => <Post item={item} key={item._id} />);
            }}
          </EasyList>
          {/*<EasyLoadMore />*/}
        </Molecule>
      </div>
    );
  }
}
const FilterSchema = new SimpleSchema({
  title: {
    type: String,
    optional: true,
    easify: {
      toFilter(value) {
        return {
          title: {
            $regex: value,
            $options: 'i',
          },
        };
      },
    },
  },
  description: {
    type: String,
    optional: true,
    easify: {
      toFilter(value) {
        return {
          description: {
            $regex: value,
            $options: 'i',
          },
        };
      },
    },
  },
});

export default PostList;