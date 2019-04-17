import React, { Component } from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { Card, Icon, Avatar, Modal, Button, Spin, notification } from 'antd';
import { deductCredit, unlockCourse, fetchUser, fetchCourse } from '../../actions';
import { connect } from 'react-redux';

import './style.css';

const openNotification = type => {
  notification[type]({
    message: 'Course Unlocked!',
    description:
      'You can view the course in unlocked section. Happy Studying :)',
  });
};

class CourseCard extends Component {
  state = { visible: false, amount: 0, redirect:false };

  componentWillUpdate(){
    this.props.fetchCourse()
  }

  showModal = e => {
    if (this.props.status === 'unlocked') {
      this.setState({
        visible: false,
        redirect: true,
      });

      console.log('propssss', this.props)
      console.log('History', this.props.history);

      let path = this.props.id;
      console.log('path', path)
      this.props.history.push(`/course/${path}`);
    } else {
      this.setState({
        visible: true,
      });
    }
  };
  renderRedirect = () => {
    let path = this.props.id;
    if (this.state.redirect) {
      return <Redirect to={`/course/${path}`} />
    }
  }

  handleUnlock = e => {
    this.props.fetchUser()
    const amount = this.props.auth.credits;
    const diffAmount = amount - this.props.price;
    const status = "unlocked"
    console.log('amount', amount);
    console.log('price', this.props.price);
    this.props.deductCredit(diffAmount);
    this.props.unlockCourse(status, this.props.id)
    this.setState({
      amount: this.props.auth.credits - this.props.price,
      visible: false,
    });
    this.props.fetchUser()
    openNotification('success')
  
     
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { Meta } = Card;

    console.log('thumbnail', this.props.thumbnail)
    return (
      <div>
      
        <Card
          bordered
          size='default'
          onClick={this.showModal}
          hoverable
          cover={
            <img
              alt="example"
              src={this.props.thumbnail}
            />
          }
          actions={
            this.props.status === 'locked'
              ? [
                  <h2>
                    <Icon type="lock" /> LOCKED
                  </h2>,
                  <h2>{this.props.price} Credits</h2>,
                ]
              : [
                  <h2>
                    <Icon type="unlock" /> UNLOCKED
                  </h2>,
                ]
          }
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title={this.props.title}
            description={this.props.teacherName}
          />
        </Card>
        <Modal
          title={[
            <h2>{this.props.title}</h2>,
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <p>
                <Icon type="play-circle" /> {this.props.totalVideos} videos
              </p>
              <p>
                <Icon type="clock-circle" /> {this.props.totalDuration} hours
              </p>
              <p>
                <Icon type="read" /> {this.props.level}
              </p>
            </div>,
          ]}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button
              style={{ display: 'flex', margin: 'auto' }}
              size="large"
              key="submit"
              type="primary"
              onClick={this.handleUnlock}
            >
              UNLOCK THIS COURSE FOR&nbsp;{this.props.price}&nbsp;CREDITS
            </Button>,
          ]}
        >
          <h3>{this.props.description}</h3>
          <h4>Features:</h4>
          <ul>
            {this.props.features &&
              this.props.features.map(feature => (
                <li key={feature}>{feature}</li>
              ))}
          </ul>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps({ auth, course }) {
  return { auth, course };
}

const mapDispatchToProps = dispatch => ({
  deductCredit: amount => dispatch(deductCredit(amount)),
  fetchUser: () => dispatch(fetchUser()),
  unlockCourse:(status, id) => dispatch(unlockCourse(status, id)),
  fetchCourse:() => dispatch(fetchCourse())
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(CourseCard),
);
