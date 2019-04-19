import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import { Wrapper, Title, ContentDiv } from "../Wrapper";
import { List } from "antd";
import CourseCard from "../CourseCard";
import { fetchCourse, editCourse } from "../../actions";
import "./style.css";

import ColorCard from "../ColorCard";

class AdminHomePage extends Component {
  componentDidMount() {
    this.props.fetchCourse();
  
  }

  delete = e => {
    alert("i m delete");
  };

  edit = item => {
    this.props.editCourse(item._id);
    this.props.history.push(`/${item._id}/edit`)
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
                    teacherName={item.teacher.name}
                    price={item.coursePrice}
                    level={item.courseLevel}
                    status={item.status}
                    totalVideos={item.totalVideos}
                    totalDuration={item.totalDuration}
                    description={item.description}
                    thumbnail={item.thumbnail}
                    features={item.feature}
                    id={item._id}
                    delete={() => this.delete(item)}
                    edit={() => this.edit(item)}
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
  editCourse: (id) => dispatch(editCourse(id))
});

export default withRouter(
  connect(
    mapStateTopProps,
    mapDispatchToProps
  )(AdminHomePage)
);
