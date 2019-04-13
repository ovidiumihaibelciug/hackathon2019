import React, {Component} from 'react';
import { Card } from 'antd';

const Box = ({ number, icon, text }) => {
  return (
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
  )
};

export default Box;