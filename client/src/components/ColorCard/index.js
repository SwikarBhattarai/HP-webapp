import React, { Component } from 'react';
import { Card, Icon, Typography } from 'antd';
import './style.css';

export default class ColorCard extends Component {
  render() {
    const { Title } = Typography;
    return (
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <Card className="card1">
          <Title style={{ color: 'white' }}>
            <Icon type="read" /> Courses
          </Title>
          <p style={{ color: 'white', fontSize: 40, marginBottom: 0 }}>10</p>
        </Card>

        <Card className="card2">
          <Title style={{ color: 'white' }}>
            <Icon type="team" /> Teachers
          </Title>
          <p style={{ color: 'white', fontSize: 40, marginBottom: 0 }}>5</p>
        </Card>

        <Card className="card3">
          <Title style={{ color: 'white' }}>
            <Icon type="team" /> Students
          </Title>
          <p style={{ color: 'white', fontSize: 40, marginBottom: 0 }}>50</p>
        </Card>
      </div>
    );
  }
}
