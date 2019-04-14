import React, {Component} from 'react';
import Navbar from "../../components/Navbar";
import Wrapper from "../../components/Wrapper";
import DocumentsBox from '../../components/Documents/DocumentsBox';
import {Button} from 'antd';
import {Link} from 'react-router-dom';
import {Molecule} from "react-molecule";
import {EasyList, EasyLoaderAgent, EasyPager, EasyPagerAgent} from "easify";
import db from 'apollo-morpher';

class Documents extends Component {
  load = ({filters, options}) => {
    return db.documents.find({
        _id: 1,
        title: 1,
        type: 1,
        pdf: 1,
        user: {
          profile: {
            name: 1,
          }
        }
      },
      {
        filters,
        options,
      },
      {
        fetchPolicy: 'no-cache'
      })
  };

  count = (filters) => {
    return db.documents.count({
        _id: 1,
      },
      {
        filters,
      },
    )
  };

  render() {
    return (
      <Wrapper>
        <Navbar className="navbar__white"/>

        <div className="documents">
          <div className="documents__button documents__button--left ">
            <Button type="primary" outline ghost><Link to="/documents/create">Add documents</Link> </Button>
          </div>
          <Molecule
            agents={{
              loader: EasyLoaderAgent.factory({load: this.load}),
              pager: EasyPagerAgent.factory({count: this.count, perPage: 8}),
            }}
          >
            <div className="documents__items">
              <EasyList>
                {({data, loading, molecule}) => {
                  return data.map((item, id) => <DocumentsBox className="documents__item" id={id} {...item} />);
                }}
              </EasyList>
            </div>
            <div className="load-more__button__container">
              <EasyPager className="load-more__button"/>
            </div>
          </Molecule>
        </div>

      </Wrapper>
    );
  }
}

export default Documents;