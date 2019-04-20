import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { Card, Icon, Avatar, Modal, Button, Popconfirm, message, notification } from "antd";
import {
  deductCredit,
  unlockCourse,
  fetchUser,
  fetchCourse
} from "../../actions";
import { connect } from "react-redux";

import "./style.css";

const openNotification = type => {
  notification[type]({
    message: "Course Unlocked!",
    description:
      "You can view the course in unlocked section. Happy Studying :)"
  });
};
const openNotificationError = type => {
  notification[type]({
    message: "Not Enough Balance!",
    description:
      "Oops! You dont have enough credit to buy this course. May be you should buy some."
  });
};

class CourseCard extends Component {
  state = { visible: false, amount: 0, redirect: false };

  componentWillUpdate() {
    this.props.fetchCourse();
  }

  showModal = e => {
    if (this.props.status === "unlocked") {
      this.setState({
        visible: false,
        redirect: true
      });

      console.log("id", this.props);
      console.log("course", this.props.course);

      console.log('item', this.props.item)

      let courseId = this.props.item._id;
      let videoId = this.props.item.videos[0]._id


      this.props.history.push(`/course/${courseId}/video/${videoId}`);
    } else {
      this.setState({
        visible: true
      });
    }
  };
  renderRedirect = () => {
    let path = this.props.id;
    if (this.state.redirect) {
      return <Redirect to={`/course/${path}`} />;
    }
  };

  handleUnlock = e => {
    this.props.fetchUser();
    const amount = this.props.auth.credits;
    if (this.props.auth.credits < this.props.price) {
      openNotificationError("error");
      this.props.fetchUser();
    } else {
      const diffAmount = amount - this.props.price;
      const status = "unlocked";
      console.log("amount", amount);
      console.log("price", this.props.price);
      this.props.deductCredit(diffAmount);
      this.props.unlockCourse(status, this.props.id);
      this.setState({
        amount: this.props.auth.credits - this.props.price,
        visible: false
      });
      this.props.fetchUser();
      openNotification("success");
    }
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { Meta } = Card;

    return (
      <div>
        <Card
          bordered
          size="default"
          onClick={this.props.auth.isAdmin ? "" : this.showModal}
          hoverable
          cover={<img alt="example" src={this.props.thumbnail} />}
          actions={
            this.props.auth.isAdmin
              ? [
                  <h2 onClick={this.props.delete}>
                    <Popconfirm
                      title="Are you sure delete this course?"
                      onConfirm={this.props.confirm}
                      onCancel={this.props.cancel}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Icon type="delete" style={{ color: "red" }} /> DELETE
                    </Popconfirm>
                  </h2>,
                  <h2 onClick={this.props.edit}>
                    <Icon type="edit" style={{ color: "orange" }} /> EDIT
                  </h2>
                ]
              : this.props.status === "locked"
              ? [
                  <h2>
                    <Icon type="lock" /> LOCKED
                  </h2>,
                  <h2>{this.props.price} Credits</h2>
                ]
              : [
                  <h2>
                    <Icon type="unlock" /> UNLOCKED
                  </h2>
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
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <p>
                <Icon type="play-circle" /> {this.props.totalVideos} videos
              </p>
              <p>
                <Icon type="clock-circle" /> {this.props.totalDuration} hours
              </p>
              <p>
                <Icon type="read" /> {this.props.level}
              </p>
            </div>
          ]}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button
              style={{ display: "flex", margin: "auto" }}
              size="large"
              key="submit"
              type="primary"
              onClick={this.handleUnlock}
            >
              UNLOCK THIS COURSE FOR&nbsp;{this.props.price}&nbsp;CREDITS
            </Button>
          ]}
        >
          <h3>{this.props.description}</h3>
          <h4>Features:</h4>
          <ul>
            {this.props.features
              ? this.props.features.map(feature => <li>{feature}</li>)
              : ""}
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
  unlockCourse: (status, id) => dispatch(unlockCourse(status, id)),
  fetchCourse: () => dispatch(fetchCourse())
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CourseCard)
);
