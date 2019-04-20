import React, { Component } from "react";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { List } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import { Spin } from "antd";
import { fetchCourse,clearData } from "../../actions";
import CourseCard from "../CourseCard";


class StudentHomePage extends Component {
  componentDidMount() {
    this.fetchCourse();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.course.course._id !== this.props.course.course._id) {
      this.fetchCourse();
    }
  }

  fetchCourse() {
    this.props.fetchCourse();
  }

  render() {
    const { course } = this.props.course;


    const unlockedCourse = course
      ? course.filter(course => course.status === "unlocked")
      : "";

    (function() {
      if (typeof Object.defineProperty === "function") {
        try {
          Object.defineProperty(Array.prototype, "sortBy", { value: sb });
        } catch (e) {}
      }
      if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;

      function sb(f) {
        for (var i = this.length; i; ) {
          var o = this[--i];
          this[i] = [].concat(f.call(o, o, i), o);
        }
        this.sort(function(a, b) {
          for (var i = 0, len = a.length; i < len; ++i) {
            if (a[i] != b[i]) return a[i] < b[i] ? -1 : 1;
          }
          return 0;
        });
        for (var i = this.length; i; ) {
          this[--i] = this[i][this[i].length - 1];
        }
        return this;
      }
    })();

    const recentCourse = course
      ? course.sortBy(function(o) {
          return o.addedTime;
        })
      : "";

    return (
      <Wrapper>
        <h1>Welcome {this.props.auth.name.givenName},</h1>
        {course ? (
          <React.Fragment>
            {unlockedCourse.length > 0 ? (
              <ContentDiv>
                <Title>Unlocked Courses!</Title>
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
                  dataSource={unlockedCourse}
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
                        item={item}
                      />
                    </List.Item>
                  )}
                />
              </ContentDiv>
            ) : (
              ""
            )}

            <Title>All Courses!</Title>
            <ContentDiv>
              {course && (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 4,
                    xxl: 3
                  }}
                  dataSource={course}
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
                        features={item.feature}
                        thumbnail={item.thumbnail}
                        item={item}
                      />
                    </List.Item>
                  )}
                />
              )}
            </ContentDiv>
            <Title>Recently added courses!</Title>
            <ContentDiv>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 4,
                  xxl: 3
                }}
                dataSource={recentCourse.slice(0, 5)}
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
                      features={item.feature}
                      thumbnail={item.thumbnail}
                      item={item}
                    />
                  </List.Item>
                )}
              />
            </ContentDiv>
          </React.Fragment>
        ) : (
          <Spin />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth, course }) => {
  return { auth, course };
};

const mapDispatchToProps = dispatch => ({
  fetchCourse: () => dispatch(fetchCourse()),
  clearData: () => dispatch(clearData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StudentHomePage);
