import React, {Component, Fragment} from 'react';
import classNames from "classnames";
import {Modal} from 'antd';
import ScrollAnimation from 'react-animate-on-scroll';

class DocumentsBox extends Component {

  state = {
    visible: false
  };

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

  render() {
    const {className, title, pdf, type, user, horizontal, id} = this.props;
    let img = 'http://www.phspotasky.com/uploads/2/4/9/2/24928880/cp2_orig.jpg';

    return (
      <Fragment>
        <ScrollAnimation animateIn="fadeIn" delay={id*150}>
          <div className={classNames("documents-item box", className, {'documents-item--horizontal': horizontal})}
               onClick={this.showModal}>
            <div className="documents-item__image-section">
              <div className="documents-item__icon">
                <i className="fa fa-file"></i>
              </div>
            </div>
            <div className="documents-item__fullname">{title || "Proces Verbal asdasda"}  </div>
            <div className="documents-item__class">{type || "Tip: proces verbal"}</div>
            <div className="documents-item__class">{user.profile.name || "Tip: proces verbal"}</div>
            <div className="documents-item__download">
              <a href={pdf} target="_blank">
                <i className="fa fa-download"></i>
              </a>
            </div>
          </div>
        </ScrollAnimation>
        <div className="documents__modal">
          <Modal
            title="Basic Modal"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
          >
            <object className="documents__modal__object" data={pdf} type="application/pdf">
              <embed src={pdf} type="application/pdf"/>
            </object>
          </Modal>
        </div>
      </Fragment>
    );
  }
}

export default DocumentsBox;