import React, { Component } from 'react';
import { Card, Icon, Typography } from 'antd';
import './style.css';

export default class ColorCard extends Component {
  render() {
    const { Title } = Typography;
    return (
      <div style={{ display: 'flex', justifyContent:'space-between'}}>
        <Card className="card1">
          <Title style={{ color: 'white' }}>
            <Icon type="read" /> {this.props.section1}
          </Title>
          <p style={{ color: 'white', fontSize: 40, marginBottom: 0 }}>{this.props.value1}</p>
        </Card>

        <Card className="card2">
          <Title style={{ color: 'white' }}>
            <Icon type="team" /> {this.props.section2}
          </Title>
          <p style={{ color: 'white', fontSize: 40, marginBottom: 0 }}>{this.props.value2}</p>
        </Card>

        <Card className="card3">
          <Title style={{ color: 'white' }}>
            <Icon type={this.props.icon3} /> {this.props.section3}
          </Title>
          <p style={{ color: 'white', fontSize: 40, marginBottom: 0 }}>{this.props.value3}</p>
        </Card>
      </div>
    );
  }
}
