import React, {Component} from 'react';
import Navbar from "../../components/Navbar";
import Wrapper from "../../components/Wrapper";
import UserBox from '../../components/Users/UserBox';
import { Button } from 'antd';

class Users extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar className="navbar__white" />
        <div className="users">
          <div className="users__items">
            <UserBox className="users__item"/>
            <UserBox className="users__item"/>
            <UserBox className="users__item"/>
            <UserBox className="users__item"/>
            <UserBox className="users__item"/>
            <UserBox className="users__item"/>
            <UserBox className="users__item"/>
            <UserBox className="users__item"/>
          </div>
          <div className="users__button">
            <Button type="primary" outline ghost>Show more</Button>
          </div>
        </div>

      </Wrapper>
    );
  }
}

export default Users;