import React, {Component} from 'react';
import classNames from "classnames";
import ScrollAnimation from 'react-animate-on-scroll';


class UserBox extends Component {
  render() {
    const { className, item, id } = this.props;
    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';
    return (
      <ScrollAnimation animateIn="fadeIn" delay={id * 150}>
        <div className={classNames("users-item box", className)}>
          <div className="users-item__image-section">
            <div className="users-item__image" style={{backgroundImage: `url(${img})`}}></div>
          </div>
          <div className="users-item__fullname">{item.profile.number}</div>
          <div className="users-item__class">10A</div>
        </div>
      </ScrollAnimation>
    );
  }
}

export default UserBox;