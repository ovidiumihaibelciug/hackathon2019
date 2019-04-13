import React, {Component} from 'react';

class Header extends Component {
  render() {
    const { children } = this.props;
    return (
      <div className="dashboard-header">
        <div>
        {children}
        </div>
      </div>

    );
  }
}

export default Header;