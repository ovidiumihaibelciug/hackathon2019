import React, {Component} from 'react';

class Loading extends Component {
  render() {
    return (
      <div className="loader-container">
        <img src="https://i.imgur.com/y9WF7dj.gif" alt="Loader"/>
      </div>
    );
  }
}

export default Loading;