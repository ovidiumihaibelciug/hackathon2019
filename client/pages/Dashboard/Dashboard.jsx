import React, {Component} from 'react';
import Wrapper from "../../components/Wrapper";
import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import {Card, Table} from 'antd';
import {Line} from 'react-chartjs-2';
import Box from '../../components/Dashboard/Box'
import Loading from '../../components/Loading';

class Dashboard extends Component {
  render() {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Medie',
          fill: false,
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: '#0575E6',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: [65, 59, 80, 81, 56, 55, 90]
        }
      ]
    };
    const dataSource = [{
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street'
    }, {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street'
    }];

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    }];

    const boxes = [
      {
        id: 1,
        icon: "fa fa-user",
        text: 'Elevi',
        number: '720',
        url: "/users"
      },
      {
        id: 2,
        icon: "fa fa-laptop",
        text: 'Supplies',
        number: '70',
        url: '/supplies'
      },
      {
        id: 3,
        icon: "fa fa-file-text",
        text: 'Documente',
        number: '1100',
        url: '/documents'

      },
      {
        id: 4,
        icon: "fa fa-university",
        text: 'Elevi promovati',
        number: '670'
      },
      {
        id: 5,
        icon: "fa fa-money",
        text: 'Burse',
        number: '53'
      },
      {
        id: 5,
        icon: "fa fa-address-card",

        text: 'Diplome',
        number: '20'
      },
    ];
    if (!Meteor.user()) {
      return <Loading />;
    }

    return (
      <Wrapper className="dashboard">
        <Header>
          <Navbar/>
        </Header>
        <div className="dashboard__elements">
          <div className="dashboard__left ">
            {
              boxes.map(item => <Box {...item} />)
            }
          </div>
          <div className="dashboard__right">
            <Card
              className="dashboard__right__card"
              title="Media note"
              extra={<a href="#">More</a>}
            >
              <Line data={data}/>
            </Card>
            <Card
              className="dashboard__right__card dashboard__right__clase"
              title="Clase"
              extra={<a href="#">More</a>}
            >
              <Table dataSource={dataSource} columns={columns} />
            </Card>
          </div>
        </div>
      </Wrapper>
    );
  }
}

export default Dashboard;