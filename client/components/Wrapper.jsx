import React, {Component} from 'react';

class Wrapper extends Component {
  render() {
    const { children, className } = this.props;
    return (
      <div className={className}>
        {children}
      </div>
    );
  }
}

export default Wrapper;