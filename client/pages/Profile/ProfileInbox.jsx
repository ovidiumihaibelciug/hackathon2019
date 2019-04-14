import React, {Component} from 'react'
import ProfileCover from '../../components/Profile/ProfileCover';
import ProfileGeneral from '../../components/Profile/ProfileGeneral';
import ActivityBox from "../../components/Profile/ActivityBox";
import {Button, Modal} from 'antd';
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
import MessageBox from "../../components/MessageBox";
import {AutoForm} from "uniforms-antd";
import SimpleSchema from "simpl-schema";

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

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  onSubmit = data => {
    data.from = Meteor.userId();
    data.to = this.props.match.params.id;
    db.messages.insert(
      data
    ).then((id) => {
      console.log(id);
    });
  };

  load = ({ filters, options }) => {
    const id = this.props.match.params.id || Meteor.userId();
    return db.messages.find({
      _id: 1,
      to: 1,
      from: 1,
      fromUser: {
        emails: 1,
      },
      title: 1,
      body: 1,
    }, {
      filters: {
        ...filters,
        to: id
      },
      options
    });
  };

  count = ({ filters, options }) => {
    const id = this.props.match.params.id || Meteor.userId();

    return db.messages.count({
      _id: 1,
      to: 1,
    }, {
      filters: {
        ...filters,
        to: id
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
                  <p>Nume: {user.profile.name}</p>
                  <p>Clasa: a {user.profile.classNumber}-a {user.profile.classLetter}</p>
                  <p>E-mail: {user.emails[0].address}</p>
                  <Button onClick={this.showModal} className="profile__general__button" type="primary" ghost>Mesaj</Button>
                  <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                  >
                    <AutoForm schema={CompleteInfoSchema} onSubmit={this.onSubmit} />
                  </Modal>
                </div>
              </div>
            </div>
            <div className="profile-body__rightside">
              <Molecule
                agents={{
                  loader: EasyLoaderAgent.factory({ load: this.load }),
                  loadMore: EasyLoadMoreAgent.factory({
                    count: this.count,
                    initialItemsCount: 1,
                    loadItemsCount: 3,
                  }),
                }}
              >
                <EasyList>
                  {({ data, loading, molecule }) => {
                    return data.map(item => <MessageBox {...item} />);
                  }}
                </EasyList>
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

const CompleteInfoSchema = new SimpleSchema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
});

export default Profile