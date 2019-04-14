import React, {Component} from 'react';
import { NavLink } from "react-router-dom";

class SecondaryNav extends Component {
  render() {
    const { isSecretar } = this.props;
    return (
      <div className="secondary__navbar">
        <div className="secondary__navbar__leftside"></div>
        <div className="secondary__navbar__rightside">
          <div className="secondary__navbar__item">
            <NavLink to={!isSecretar ? '/profile' : `/profile/${isSecretar}`} exact activeClassName={'secondary__navbar__item--active'}>Activity</NavLink>
          </div>

          <div className="secondary__navbar__item">
            <NavLink to={!isSecretar ? '/profile/documents' : `/profile/${isSecretar}/documents`} exact activeClassName={'secondary__navbar__item--active'}>Documents</NavLink>
          </div>

          <div className="secondary__navbar__item">
            <NavLink to={!isSecretar ? '/profile/user/inbox' : `/profile/user/inbox`} exact activeClassName={'secondary__navbar__item--active'}>Inbox</NavLink>
          </div>
        </div>
      </div>
    );
  }
}

export default SecondaryNav;