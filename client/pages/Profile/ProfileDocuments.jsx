import React, {Component} from 'react'
import ProfileCover from '../../components/Profile/ProfileCover';
import ProfileGeneral from '../../components/Profile/ProfileGeneral';
import ActivityBox from "../../components/Profile/ActivityBox";
import {Button} from 'antd';
import Navbar from "../../components/Navbar";
import SecondaryNav from "../../components/Profile/SecondaryNav";
import Loading from '../../components/Loading'
import DocumentsBox from "../../components/Documents/DocumentsBox";
import { Molecule, mole } from 'react-molecule';
import {
  EasyTable,
  EasyLoaderAgent,
  EasyList,
  EasyLoadMoreAgent,
  EasyPager,
  EasyLoadMore
} from 'easify';
import db from 'apollo-morpher';

export class Profile extends Component {

  state = {
    user: '',
    loading: true,
  };

  componentDidMount() {
    const id = this.props.match.params || Meteor.userId();
    if (!Meteor.userId()) {
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
        .then(result => {
          this.setState({ user: result, loading: false });
        });

    } else {
      this.setState({
        user: Meteor.user(),
        loading: false
      });
    }

  }

  load = ({ filters, options }) => {
    const id = this.props.match.params.id || Meteor.userId();
    return db.documents.find({
      _id: 1,
      pdf: 1,
      type: 1,
      title: 1,
      user: {
        profile: {
          name: 1,
        }
      }
    }, {
      filters: {
        ...filters,
        userId: id
      },
      options
    });
  };

  count = ({ filters, options }) => {
    const id = this.props.match.params.id || Meteor.userId();

    return db.documents.count({
      _id: 1,
      pdf: 1,
      type: 1,
      title: 1,
    }, {
      filters: {
        ...filters,
        userId: id
      },
      options
    });
  }

  render() {
    const { user, loading } = this.state;
    const id = this.props.match.params.id || Meteor.userId() ;
    let img = 'https://i.imgur.com/GcP71BP.png';

    if (loading) {
      return <Loading />
    }

    return (
      <React.Fragment>
        <Navbar className="navbar__white" />
        <div className="profile__container">
          <ProfileCover cover={img}/>
          <SecondaryNav />
          <div className="profile-body">
            <div className="profile-body__leftside">
              <ProfileGeneral user={user}/>
              <div className="profile__general__box box">
                <div className="profile__general__info">
                  <div>Clasa: a {user.profile.classNumber}-a {user.profile.classLetter}</div>
                  <div>E-mail: {user.emails[0].address}</div>
                  <div className="profile__general__button__container">
                    <Button className="profile__general__button" type="primary" ghost>Mesaj</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-body__rightside">
              <Molecule
                agents={{
                  loader: EasyLoaderAgent.factory({ load: this.load }),
                  loadMore: EasyLoadMoreAgent.factory({
                    count: this.count,
                    initialItemsCount: 9,
                    loadItemsCount: 3,
                  }),
                }}
              >
                <div className="profile__documents-row">
                    <EasyList>
                    {({ data, loading, molecule }) => {
                      return data.map(item => <DocumentsBox horizontal {...item} />);
                    }}
                  </EasyList>
                </div>
                <div className="load-more__button__container">
                  <EasyLoadMore className="load-more__button" />
                </div>
              </Molecule>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Profile