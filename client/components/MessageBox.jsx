import React, {Component} from 'react';
import moment from 'moment';

class MessageBox extends Component {
  render() {
    const {title, body, fromUser, createdAt} = this.props;
    return (
      <div className="headerResponseGmail box">
        <div className="iconResponseGmail">
          <i className="fa fa-envelope-square"></i>
        </div>
        <div className="withWho">
          <div className="message__title">{title}</div>
          <div className="message__details">
            <div className="message__email">From: {fromUser.emails[0].address} &nbsp;</div>
            <div className="message__date">{moment(createdAt).startOf('day').fromNow()}</div>
          </div>
        </div>
        <div className="message__body">
          <p>{body}</p>
        </div>

      </div>
    );
  }
}

export default MessageBox;