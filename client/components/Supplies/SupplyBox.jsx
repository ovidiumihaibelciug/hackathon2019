import React, {Component} from 'react';
import classNames from "classnames";
import ScrollAnimation from 'react-animate-on-scroll';


class SupplyBox extends Component {
  render() {
    const { className, title, description, tags, id } = this.props;
    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';

    return (
      <ScrollAnimation animateIn="fadeIn" delay={id * 150}>
        <div className={classNames("supplies-item box", className)}>
          <div className="supplies-item__image-section">
            <div className="supplies-item__image"></div>
          </div>
          <div className="supplies-item__fullname">{title}</div>
          <div className="supplies-item__class">Description: {description}</div>
          <div className="supplies-item__tags">Tags: {tags.map(item => <span>{item}</span>)}</div>
        </div>
      </ScrollAnimation>
    );
  }
}

export default SupplyBox;