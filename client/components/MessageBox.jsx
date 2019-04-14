import React, {Component} from 'react';

class MessageBox extends Component {
  render() {
    const {title, body, fromUser} = this.props;
    return (
      <div className="headerResponseGmail box">
        <div className="iconResponseGmail">
          <i className="fa fa-envelope-square"></i>
        </div>
        <div className="withWho">
          <p>Title: {title}</p>
          <p>From: {fromUser.emails[0].address}</p>
        </div>
        <div className="readResponseGmail">
          <p>Message: {body}</p>
        </div>

      </div>
    );
  }
}

export default MessageBox;