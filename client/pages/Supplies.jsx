import React, {Component} from 'react';
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import SupplyBox from '../components/Supplies/SupplyBox';
import { Button } from 'antd';
import {EasyList, EasyLoaderAgent, EasyLoadMore, EasyLoadMoreAgent, EasyPager, EasyPagerAgent} from "easify";
import DocumentsBox from "../components/Documents/DocumentsBox";
import {Molecule} from "react-molecule";
import db from 'apollo-morpher'
import { Link } from 'react-router-dom';

class Supplies extends Component {

  load = ({filters, options}) => {
    return db.supplies.find({
        _id: 1,
        title: 1,
        description: 1,
        tags: 1,
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
    return db.supplies.count({
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
        <Navbar className="navbar__white" />

        <div className="supplies">
          <div className="supplies__button supplies__button--left ">
            <Button type="primary" outline ghost>
              <Link to="/supplies/create">
                Add supply
              </Link>
            </Button>
          </div>
          <Molecule
            agents={{
              loader: EasyLoaderAgent.factory({load: this.load}),
              loadMore: EasyLoadMoreAgent.factory({
                count: this.count,
                initialItemsCount: 4,
                loadItemsCount: 4,
              }),
            }}
          >
            <div className="supplies__items">
              <EasyList>
                {({data, loading, molecule}) => {
                  return data.map(item =>  <SupplyBox className="supplies__item" {...item} />);
                }}
              </EasyList>
            </div>
            <div className="load-more__button__container">
              <EasyLoadMore className="load-more__button" />
            </div>
          </Molecule>

        </div>

      </Wrapper>
    );
  }
}

export default Supplies;