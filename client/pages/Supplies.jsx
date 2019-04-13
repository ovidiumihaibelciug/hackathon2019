import React, {Component} from 'react';
import Navbar from "../components/Navbar";
import Wrapper from "../components/Wrapper";
import SupplyBox from '../components/Supplies/SupplyBox';
import { Button } from 'antd';

class Supplies extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar className="navbar__white" />

        <div className="supplies">
          <div className="supplies__button supplies__button--left ">
            <Button type="primary" outline ghost>Add supply</Button>
          </div>
          <div className="supplies__items">
            <SupplyBox className="supplies__item"/>
            <SupplyBox className="supplies__item"/>
            <SupplyBox className="supplies__item"/>
            <SupplyBox className="supplies__item"/>
            <SupplyBox className="supplies__item"/>
            <SupplyBox className="supplies__item"/>
            <SupplyBox className="supplies__item"/>
            <SupplyBox className="supplies__item"/>
          </div>
          <div className="supplies__button">
            <Button type="primary" outline ghost>Show more</Button>
          </div>
        </div>

      </Wrapper>
    );
  }
}

export default Supplies;