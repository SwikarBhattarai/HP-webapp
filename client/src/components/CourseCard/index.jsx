import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  Card,
  Icon,
  Avatar,
  Modal,
  Button,
  Popconfirm,
  notification
} from "antd";
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

  componentWillUpdate(prevProps) {
    this.fetchCourse()
  }

  componentWillUnmount(){
    this.fetchCourse()
  }

  fetchCourse(){
    this.props.fetchCourse()
  }

  showModal = e => {
    if (this.props.status === "unlocked") {
      this.setState({
        visible: false,
        redirect: true
      });
      if(this.props.item){
        let courseId = this.props.item._id;
        let videoId = this.props.item.videos[0]._id;
        this.props.history.push(`/course/${courseId}/video/${videoId}`);
      }

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
              <Avatar src="data:image/jpeg;base64,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" />
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
