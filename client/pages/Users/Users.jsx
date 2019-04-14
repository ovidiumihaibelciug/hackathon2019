import React, {Component} from 'react';
import Navbar from "../../components/Navbar";
import Wrapper from "../../components/Wrapper";
import {Molecule} from "react-molecule";
import {EasyList, EasyLoaderAgent, EasyPager, EasyPagerAgent} from "easify";
import db from 'apollo-morpher';
import {Link} from "react-router-dom";
import SimpleSchema from "simpl-schema";
import {AutoForm} from "uniforms-antd";
import {Card} from 'antd';
import ScrollAnimation from "react-animate-on-scroll";


class Users extends Component {

  state = {
    showForm: false,
    isFiltering: false,
    filteredData: [],
  };

  load = ({filters, options}) => {
    return db.users.find({
      _id: 1,
      emails: 1,
      profile: {
        name: 1,
        classNumber: 1,
        classLetter: 1,
      }
    }, {
      filters: {
        ...filters,
      },
      options
    });
  };

  count = ({filters, options}) => {
    return db.users.count({
      _id: 1,
    }, {
      filters,
      options
    });
  };

  onSubmit = (data) => {
    console.log(data);

    db.users.find({
        _id: 1,
        emails: 1,
        profile: {
          name: 1,
          classNumber: 1,
          classLetter: 1,
        }
      }, {
        filters: {},
        options: {}
      },
      {
        fetchPolicy: 'no-cache'
      }
    ).then(result => {
      const newData = result.filter(item => (data.name && item.profile.name.toLowerCase().includes(data.name.toLowerCase())) || (data.email && item.emails[0].address.toLowerCase().includes(data.email.toLowerCase())));
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
        <Molecule
          agents={{
            loader: EasyLoaderAgent.factory({load: this.load}),
            pager: EasyPagerAgent.factory({count: this.count, perPage: 6}),
          }}
        >
          <Navbar className="navbar__white"/>
          <div className="users__container">
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
          </div>
          <div>
            {!isFiltering ? (
              <div className="users">
                <div className="users__items">
                  <EasyList>
                    {({data, loading, molecule}) => {
                      if (loading) return null;
                      return data.map((item, id) => {
                        let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';
                        return (<Link to={`/profile/${item._id}`}>
                          <ScrollAnimation animateIn="fadeIn" delay={id * 150}>
                          <div className="users-item box">
                            <div className="users-item__image-section">
                              <div className="users-item__image" style={{backgroundImage: `url(${img})`}}></div>
                            </div>
                            <div className="users-item__fullname">{item.profile.name}</div>
                            <div
                              className="users-item__class">{item.profile.classNumber}{item.profile.classLetter}</div>
                          </div>
                          </ScrollAnimation>
                        </Link>)
                      })
                    }}
                  </EasyList>
                </div>
                <div className="load-more__button__container users-pager">
                  <EasyPager/>
                </div>
              </div>
            ) : <div></div>}
          </div>
          {
            isFiltering ? (
            <div className="users">
              <div className="users__items">
                {
                  filteredData.map((item, id) => {
                    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';
                    return (
                      <Link to={`/profile/${item._id}`}>
                        <ScrollAnimation animateIn="fadeIn" delay={id * 150}>

                        <div className="users-item box">
                          <div className="users-item__image-section">
                            <div className="users-item__image" style={{backgroundImage: `url(${img})`}}></div>
                          </div>
                          <div className="users-item__fullname">{item.profile.name}</div>
                          <div className="users-item__class">{item.profile.classNumber}{item.profile.classLetter}</div>
                        </div>
                        </ScrollAnimation>
                      </Link>
                    )
                  })
                }
              </div>
            </div>
            ) : <div></div>
          }
        </Molecule>
      </Wrapper>
    );
  }
}

const FilterSchema = new SimpleSchema({
  name: {
    type: String,
    optional: true
  },
  email: {
    type: String,
    optional: true
  }
});

export default Users;