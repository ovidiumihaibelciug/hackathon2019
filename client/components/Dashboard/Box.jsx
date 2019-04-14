import React, {Component} from 'react';
import { Card } from 'antd';
import {Link} from "react-router-dom";

const Box = ({ number, icon, text, url = '/users' }) => {
  return (
    <div>
      <Link to={url}>
      <Card
        style={{width: 300}}
        className="card"
      >
        <div className="card__icon">
          <i className={icon}></i>
        </div>
        <div className="card__number">
          {number}
        </div>
        <div className="card__title">
          {text}
        </div>
      </Card>
    </Link>
    </div>
  )
};

export default Box;