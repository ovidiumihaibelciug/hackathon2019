import React, {Component} from 'react'
import ProfileCover from '../../components/Profile/ProfileCover';
import ProfileGeneral from '../../components/Profile/ProfileGeneral';
import ActivityBox from "../../components/Profile/ActivityBox";
import {Button, Modal} from 'antd';
import Navbar from "../../components/Navbar";
import SecondaryNav from "../../components/Profile/SecondaryNav";
import Loading from '../../components/Loading'
import {AutoForm} from "uniforms-antd";
import SimpleSchema from "simpl-schema";
import notification from "antd/lib/notification";
import db from 'apollo-morpher';
import ScrollAnimation from 'react-animate-on-scroll';

export class Profile extends Component {

  state = {
    user: '',
    loading: true,
    visible: false
  };

  componentDidMount() {
    if (!Meteor.userId()) {
      const {id} = this.props.match.params;
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
          filters: {_id: id},
        })
        .then(result => this.setState({user: result, loading: false}));

    } else {
      this.setState({
        user: Meteor.user(),
        loading: false
      });
    }

  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  onSubmit = data => {
    data.from = Meteor.userId();
    data.to = this.props.match.params.id || Meteor.userId();
    db.messages.insert(
      data
    ).then((id) => {
      notification.open({
        message: 'Message sent',
      });
      this.setState({
        visible: false
      })
    });
  };

  render() {
    const {user, loading} = this.state;
    const id = this.props.match.params.id || Meteor.userId();
    let img = 'https://i.imgur.com/GcP71BP.png';
    let bio = ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita rem, soluta temporibus veniam obcaecati voluptatum voluptas iusto deserunt, quae molestias minus natus recusandae quos facilis et eaque ad non! Quidem voluptate ducimus molestiae nostrum at error quo reprehenderit laborum quae! ';

    if (loading) {
      return <Loading/>
    }

    return (
      <React.Fragment>
        <Navbar className="navbar__white"/>
        <div className="profile__container">
          <ProfileCover cover={img}/>
          <SecondaryNav isSecretar={this.props.match.params.id}/>
          <div className="profile-body">
            <div className="profile-body__leftside">
              <ProfileGeneral user={user}/>
              <div className="profile__general__box box">
                <div className="profile__general__info">
                  <div className="profile__general__info__item">Clasa:
                    a {user.profile.classNumber}-a {user.profile.classLetter}</div>
                  <div className="profile__general__info__item">{user.emails[0].address}</div>
                  <div className="profile__general__button__container">
                    <Button onClick={this.showModal} className="profile__general__button" type="primary"
                            ghost>Mesaj</Button>
                    <Modal
                      title="Basic Modal"
                      visible={this.state.visible}
                      footer={null}
                    >
                      <AutoForm schema={CompleteInfoSchema} onSubmit={this.onSubmit}/>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-body__rightside">
              <ScrollAnimation animateIn="slideInUp" >
                <ActivityBox/>
              </ScrollAnimation>
              <ScrollAnimation animateIn="slideInUp" delay={200}>
                <ActivityBox/>
              </ScrollAnimation>
              <ScrollAnimation animateIn="slideInUp" delay={200}>
                <ActivityBox/>
              </ScrollAnimation>
              <ScrollAnimation animateIn="slideInUp" delay={200}>
                <ActivityBox/>
              </ScrollAnimation>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const CompleteInfoSchema = new SimpleSchema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

export default Profile