import React, {Component} from 'react';
import classNames from "classnames";

class UserBox extends Component {
  render() {
    const { className, item } = this.props;
    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';
    console.log(item);
    return (
      <div className={classNames("users-item box", className)}>
        <div className="users-item__image-section">
          <div className="users-item__image" style={ { backgroundImage: `url(${img})` } }></div>
        </div>
        <div className="users-item__fullname">{item.profile.number}</div>
        <div className="users-item__class">10A</div>
      </div>
    );
  }
}

export default UserBox;