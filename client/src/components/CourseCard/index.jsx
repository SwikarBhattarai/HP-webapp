import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import {
  Card,
  Icon,
  Avatar,
  Modal,
  Button,
  Popconfirm,
  notification,
  Statistic,
  Row,
  Col,
  Divider
} from "antd";
import {
  deductCredit,
  unlockCourse,
  fetchUser,
  fetchCourse,
  fetchUserCourse
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

  componentDidMount() {
    this.fetchCourse();
  }

  fetchCourse() {
    this.props.fetchCourse();
  }

  showModal = e => {
    if (this.props.auth.isTeacher) {
      this.setState({
        visible: true
      });
    }
    if (this.props.status === "unlocked") {
      this.setState({
        visible: false,
        redirect: true
      });
      if (this.props.item) {
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

  renderFooter = () => {
    if (this.props.auth.isTeacher) {
      return '';
    } else if (this.props.auth.isAdmin) {
      return(
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
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
        </h2>
        <Divider type="vertical" style={{clear:"both", height:35, padding:0}} />
        <h2 onClick={this.props.edit}>
          <Icon type="edit" style={{ color: "orange" }} /> EDIT
        </h2>
      </div>
      )
     
    } else {
      return [
        <h4 style={{ color: "blue" }}>{this.props.price} Credits</h4>
      ];
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

      const courseId = this.props.item._id;
      const userId = this.props.auth._id;
      this.props.unlockCourse(userId, courseId);
      this.props.fetchUser()
      this.setState({
        amount: this.props.auth.credits - this.props.price,
        visible: false
      });
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
        >
          <Meta
            title={<text style={{ fontSize: 22 }}>{this.props.title}</text>}
            description={[
              <h4>{this.props.teacherName}</h4>,
              this.renderFooter()
            ]}
          />
        </Card>
        {this.props.auth.isTeacher ? (
          <Modal
            visible={this.state.visible}
            onCancel={this.handleCancel}
            footer={null}
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
          >
            <Row gutter={16}>
              <Col span={12}>
                <Statistic title="Total Students" value={1} />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Total Earnings ($)"
                  value={this.props.totalEarnings}
                  precision={2}
                />
              </Col>
            </Row>
          </Modal>
        ) : (
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
        )}
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
  unlockCourse: (userId, courseId) => dispatch(unlockCourse(userId, courseId)),
  fetchCourse: () => dispatch(fetchCourse()),
  fetchUserCourse:(id) => dispatch(fetchUserCourse(id)),
});
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CourseCard)
);
