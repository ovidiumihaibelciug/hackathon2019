import React, {Component, Fragment} from 'react';
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import SupplyBox from '../components/Supplies/SupplyBox';
import {Button, Card} from 'antd';
import {EasyList, EasyLoaderAgent, EasyLoadMore, EasyLoadMoreAgent} from "easify";
import {Molecule} from "react-molecule";
import db from 'apollo-morpher'
import {Link} from 'react-router-dom';
import SimpleSchema from 'simpl-schema';
import {AutoForm} from "uniforms-antd";

class Supplies extends Component {

  state = {
    showForm: false,
    isFiltering: false,
    filteredData: [],
  };

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

  onSubmit = (data) => {
    db.supplies.find({
        _id: 1,
        title: 1,
        description: 1,
        tags: 1,
      }, {
        filters: {},
        options: {}
      },
      {
        fetchPolicy: 'no-cache'
      }
    ).then(result => {
      const newData = result.filter(item => data.title && item.title.toLowerCase().includes(data.title.toLowerCase()));
      console.log(result);
      this.setState({
        isFiltering: true,
        filteredData: newData,
      })
    })
  };

  render() {
    const {showForm, isFiltering, filteredData} = this.state;

    return (
      <Wrapper>
        <Navbar className="navbar__white"/>
        <div className="supplies">
          <div className="filters-secondary">
            <div className="filters-secondary__line">
              <div className="filters-secondary__line__box"
                   onClick={() => this.setState(state => ({showForm: !state.showForm}))}>
                    <span>
                      Advanced Search
                      &nbsp;
                      <i className="fa fa-chevron-down"></i>
                    </span>
              </div>
            </div>
          </div>
          {
            showForm && (
              <Card>
                <AutoForm onSubmit={this.onSubmit} schema={FilterSchema}/>
              </Card>
            )
          }
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
                initialItemsCount: 6,
                loadItemsCount: 6,
              }),
            }}
          >
            {
              !isFiltering ?
                (<Fragment>
                  <div className="supplies__items">
                    <EasyList>
                      {({data, loading, molecule}) => {
                        return data.map((item, id) => <SupplyBox className="supplies__item" id={id} {...item} />);
                      }}
                    </EasyList>
                  </div>
                  < div className="load-more__button__container">
                    < EasyLoadMore className="load-more__button"/>
                  </div>
                </Fragment>) : <div></div>
            }
            {
              isFiltering ? (
                <div className="users">
                  <div className="users__items">
                    {
                      filteredData.map(item => {
                        return (
                          <SupplyBox className="supplies__item" {...item} />
                        )
                      })
                    }
                  </div>
                </div>
              ) : <div></div>
            }
          </Molecule>

        </div>

      </Wrapper>
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
});

export default Supplies;