import React, {Component} from 'react';
import Navbar from "../../components/Navbar";
import Wrapper from "../../components/Wrapper";
import DocumentsBox from '../../components/Documents/DocumentsBox';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

class Documents extends Component {
  render() {
    return (
      <Wrapper>
        <Navbar className="navbar__white" />

        <div className="documents">
          <div className="documents__button documents__button--left ">
            <Button type="primary" outline ghost><Link to="/documents/create">Add supply</Link> </Button>
          </div>
          <div className="documents__items">
            <DocumentsBox className="documents__item"/>
            <DocumentsBox className="documents__item"/>
            <DocumentsBox className="documents__item"/>
            <DocumentsBox className="documents__item"/>
            <DocumentsBox className="documents__item"/>
            <DocumentsBox className="documents__item"/>
            <DocumentsBox className="documents__item"/>
            <DocumentsBox className="documents__item"/>
          </div>
          <div className="documents__button">
            <Button type="primary" outline ghost>Show more</Button>
          </div>
        </div>

      </Wrapper>
    );
  }
}

export default Documents;