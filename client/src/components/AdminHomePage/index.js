import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Wrapper, Title, ContentDiv } from "../Wrapper";
import { List } from "antd";
import CourseCard from "../CourseCard";
import { fetchCourse, editCourse, deleteCourse } from "../../actions";
import { message, Spin } from "antd";
import "./style.css";

import ColorCard from "../ColorCard";

class AdminHomePage extends Component {
  state = {
    loading: false
  };
  componentDidMount() {
    this.props.fetchCourse();
  }

  cancel = () => {
    message.error("Cancelled");
  };

  confirm = item => {
    console.log("i", item);
    this.props.deleteCourse(item._id);
    if (this.props.course) {
      if (this.props.course.loading && !this.props.course.course) {
        this.setState({
          loading: true
        });
      } else {
        message.success("Deleted");
        this.setState({
          loading: false
        });
      }
    }
  };

  edit = item => {
    this.props.editCourse(item._id);
    this.props.history.push(`/${item._id}/edit`);
  };
  render() {
    return (
      <Wrapper>
        <Title>Welcome HP Admin,</Title>
        <ContentDiv>
          <ColorCard />
        </ContentDiv>
        {this.props.course.course ? (
          <ContentDiv>
            <Title>ALL COURSES</Title>
            {this.state.loading ? <Spin tip="Deleting..." /> : ""}
            <List
              style={{ marginTop: 12 }}
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 4,
                xxl: 3
              }}
              dataSource={this.props.course.course}
              renderItem={item => (
                <List.Item>
                  <CourseCard
                    title={item.courseTitle}
                    teacherName={item.teacher}
                    price={item.coursePrice}
                    level={item.courseLevel}
                    status={item.status}
                    totalVideos={item.totalVideos}
                    totalDuration={item.totalDuration}
                    description={item.description}
                    thumbnail={item.thumbnail}
                    features={item.feature}
                    id={item._id}
                    edit={() => this.edit(item)}
                    confirm={() => this.confirm(item)}
                    cancel={() => this.cancel()}
                  />
                </List.Item>
              )}
            />
          </ContentDiv>
        ) : (
          ""
        )}
      </Wrapper>
    );
  }
}

function mapStateTopProps({ course }) {
  return { course };
}

const mapDispatchToProps = dispatch => ({
  fetchCourse: () => dispatch(fetchCourse()),
  editCourse: id => dispatch(editCourse(id)),
  deleteCourse: id => dispatch(deleteCourse(id))
});

export default withRouter(
  connect(
    mapStateTopProps,
    mapDispatchToProps
  )(AdminHomePage)
);
