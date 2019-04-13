import React, {Component} from 'react';

class ActivityBox extends Component {
  render() {
    return (
      <div className="profile__box-icon">
        <i className="fa fa-star"></i>
        <div className="profile__box-icon__container">
          <div className="profile__box-icon__class">Materie</div>
          <div className="profile__box-icon__grade">10</div>
          <div className="profile__box-icon__dl">Dl John Doe</div>
        </div>
      </div>
    );
  }
}

export default ActivityBox;