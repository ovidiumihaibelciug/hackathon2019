import React, {Component} from 'react'
import ProfileCover from '../../components/Profile/ProfileCover';
import ProfileGeneral from '../../components/Profile/ProfileGeneral';
import ActivityBox from "../../components/Profile/ActivityBox";
import {Button} from 'antd';
import Navbar from "../../components/Navbar";
import SecondaryNav from "../../components/Profile/SecondaryNav";
import Loading from '../../components/Loading'
import DocumentsBox from "../../components/Documents/DocumentsBox";

export class Profile extends Component {

  state = {
    user: '',
    loading: true,
  };

  componentDidMount() {
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
        .then(result => this.setState({ user: result, loading: false }));

    } else {
      this.setState({
        user: Meteor.user(),
        loading: false
      });
    }

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
                  <p>Nume: {user.profile.name}</p>
                  <p>Clasa: a {user.profile.classNumber}-a {user.profile.classLetter}</p>
                  <p>E-mail: {user.emails[0].address}</p>
                  <div className="profile__general__button__container">
                    <Button className="profile__general__button" type="primary" ghost>Mesaj</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-body__rightside">
              <DocumentsBox />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Profile