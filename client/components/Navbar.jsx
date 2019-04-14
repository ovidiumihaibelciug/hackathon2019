import React, {Component} from 'react';
import {Link, NavLink} from "react-router-dom";
import classNames from 'classnames';

class Navbar extends Component {
  render() {
    const {user, className} = this.props;
    let isStudent;
    if (!Meteor.user()) {
      return null;
    }
    if (Meteor.user()) {
      if ( Meteor.user() && Meteor.user().roles && Meteor.user().roles[0] === 'STUDENT') {
        isStudent = true;
      }
    } else {
      isStudent = false;
    }

    return (
      <div className={classNames("navbar", className)}>
        <div className="navbar__inner">
          <div className="navbar__left-side">
            <div className="navbar__left-side__logo"> <Link to="/profile">Logo</Link></div>
            {
              !isStudent ? <div className="navbar__left-side__item">
                <NavLink to={"/dashboard"} activeClassName="navbar__left-side__item--active">Dashboard</NavLink>
              </div> : <div></div>
            }


            {
              !isStudent ? <div className="navbar__left-side__item"><NavLink to={"/documents"}
                                                                             activeClassName="navbar__left-side__item--active">Documents</NavLink>
                </div>
                : <div className="navbar__left-side__item"><NavLink to={"/documents/create"}
                                                                    activeClassName="navbar__left-side__item--active">Create
                  Document</NavLink></div>
            }
          </div>
          <div className="navbar__right-side">
            <div className="navbar__left-side__item">
              <Link to="/login" activeClassName="navbar__left-side__item--active" onClick={() => {Meteor.logout()}}>Log out</Link>
            </div>
            <div className="navbar__right-side__user">
              <div className="navbar__right-side__user__image"
                   style={{backgroundImage: `url('https://images.unsplash.com/photo-1456327102063-fb5054efe647?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80')`}}></div>
              <div className="navbar__right-side__user__name">{Meteor.user() && Meteor.user().profile.name}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Navbar;