import React, {Component} from 'react';
import classNames from "classnames";

class SupplyBox extends Component {
  render() {
    const { className } = this.props;
    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';

    return (
      <div className={classNames("supplies-item box", className)}>
        <div className="supplies-item__image-section">
          <div className="supplies-item__image"></div>
        </div>
        <div className="supplies-item__fullname">Lorem Ipsum Dolor</div>
        <div className="supplies-item__class">10A</div>
      </div>
    );
  }
}

export default SupplyBox;