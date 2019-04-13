import React, { Component } from 'react'
import classNames from 'classnames';

export class ProfileGeneral extends Component {
  render() {
    const { className, user } = this.props;
    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';
    return (
      <div className={classNames("profile-general box", className)}>
        <div className="profile-image-section">
            <div className="profile-image" style={ { backgroundImage: `url(${img})` } }></div>
        </div>
        <div className="profile-general-fullname">{user.profile.name}</div>
      </div>
    )
  }
}

export default ProfileGeneral
