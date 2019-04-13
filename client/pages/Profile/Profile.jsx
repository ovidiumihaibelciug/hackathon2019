import React, {Component} from 'react'
import ProfileCover from '../../components/Profile/ProfileCover';
import ProfileGeneral from '../../components/Profile/ProfileGeneral';
import ActivityBox from "../../components/Profile/ActivityBox";
import {Button} from 'antd';
import Navbar from "../../components/Navbar";

export class Profile extends Component {
  render() {
    let img = 'https://i.imgur.com/GcP71BP.png';
    let bio = ' Lorem ipsum dolor sit amet consectetur, adipisicing elit. Expedita rem, soluta temporibus veniam obcaecati voluptatum voluptas iusto deserunt, quae molestias minus natus recusandae quos facilis et eaque ad non! Quidem voluptate ducimus molestiae nostrum at error quo reprehenderit laborum quae! ';
    return (
      <React.Fragment>
        <Navbar className="navbar__white" />
        <div className="profile__container">
          <ProfileCover cover={img}/>
          <div className="profile-body">
            <div className="profile-body__leftside">
              <ProfileGeneral/>
              <div className="profile__general__box box">
                <div className="profile__general__info">
                  <p>Nume: Cosmin Astefanoaiei</p>
                  <p>Clasa: a 9-a A</p>
                  <p>E-mail: cosmin_astefanoaiei@gmail.com</p>
                  <div className="profile__general__button__container">
                    <Button className="profile__general__button" type="primary" ghost>Mesaj</Button>
                  </div>
                </div>
              </div>
            </div>
            <div className="profile-body__rightside">
              <ActivityBox/>
              <ActivityBox/>
              <ActivityBox/>
              <ActivityBox/>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Profile