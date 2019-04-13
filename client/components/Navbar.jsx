import React, {Component} from 'react';
import { NavLink } from "react-router-dom";
import classNames from 'classnames';

class Navbar extends Component {
  render() {
    const { user, className } = this.props;

    return (
      <div className={classNames("navbar", className)}>
        <div className="navbar__inner">
          <div className="navbar__left-side">
            <div className="navbar__left-side__logo">Logo</div>
            <div className="navbar__left-side__item"><NavLink to={"/dashboard"} activeClassName="navbar__left-side__item--active" />Dashboard</div>
            <div className="navbar__left-side__item"><NavLink to={"/dashboard"} activeClassName="navbar__left-side__item--active" />Documents</div>
          </div>
          <div className="navbar__right-side">
            <div className="navbar__right-side__user">
              <div className="navbar__right-side__user__image"></div>
              <div className="navbar__right-side__user__name">John Snow</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;