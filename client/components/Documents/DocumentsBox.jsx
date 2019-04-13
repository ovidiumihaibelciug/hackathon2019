import React, {Component} from 'react';
import classNames from "classnames";

class DocumentsBox extends Component {
  render() {
    const { className } = this.props;
    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';

    return (
      <div className={classNames("documents-item box", className)}>
        <div className="documents-item__image-section">
          <div className="documents-item__icon">
            <i className="fa fa-file"></i>
          </div>
        </div>
        <div className="documents-item__fullname">Proces Verbal asdasda</div>
        <div className="documents-item__class">Tip: proces verbal</div>
        <div className="documents-item__download">
          <i className="fa fa-download"></i>
        </div>
      </div>
    );
  }
}

export default DocumentsBox;