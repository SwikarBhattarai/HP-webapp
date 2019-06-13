import React, { Component } from "react";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { List } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import { Spin } from "antd";
import { fetchCourse, clearData, fetchUserCourse } from "../../actions";
import CourseCard from "../CourseCard";

class StudentHomePage extends Component {


  componentDidMount() {
    this.fetchCourse();
    this.fetchUserCourse();
  }

  componentWillMount() {
    this.fetchCourse();
    this.fetchUserCourse();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.credits !== this.props.auth.credits) {
      this.fetchUserCourse();
    }
  }



  fetchCourse() {
    this.props.fetchCourse();
  }

  fetchUserCourse() {
    this.props.fetchUserCourse(this.props.auth._id);
  }

  render() {
    console.log("usercourse", this.props.course.userCourse);
    const { course, userCourse } = this.props.course;

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

    const unlockedCourse = userCourse && userCourse.courses

  
      
    console.log('unlock', unlockedCourse)

    const fcourse =
      course &&
      course.map(course => {
        return course;
      });
    console.log("f", fcourse);

    const ucourse =
      unlockedCourse &&
      unlockedCourse.map(course => {
        return course.course;
      });

 


    var allCourses =
      fcourse && ucourse.length >=1
        ? fcourse.filter(course1 => {
           
            return !ucourse.some(course2 => course1._id === course2._id);
          })
        : fcourse;
      

    const recentCourse = allCourses
      ? allCourses.sortBy(function(o) {
          return o.addedTime;
        })
      : "";


    return (
      <Wrapper>
        {course && userCourse ? (
          <React.Fragment>
            <Title>Welcome {this.props.auth.name.givenName},</Title>
            {unlockedCourse.length >=1 && (
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
                        title={item.course.courseTitle}
                        teacherName={item.course.teacher}
                        price={item.course.coursePrice}
                        level={item.course.courseLevel}
                        status={item.status}
                        totalVideos={item.course.totalVideos}
                        totalDuration={item.course.totalDuration}
                        description={item.course.description}
                        thumbnail={item.course.thumbnail}
                        features={item.course.feature}
                        item={item.course}
                      />
                    </List.Item>
                  )}
                />
              </ContentDiv>
            )}
            {allCourses.length >= 1 && (
              <ContentDiv>
                <Title>All Courses!</Title>
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
                  dataSource={allCourses}
                  renderItem={item => (
                    <List.Item>
                      <CourseCard
                        title={item.courseTitle}
                        teacherName={item.teacher}
                        price={item.coursePrice}
                        level={item.courseLevel}
                        status="locked"
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
            )}

            {recentCourse.length >= 1 && (
              <ContentDiv>
                <Title>Recently added courses!</Title>
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
            )}
          </React.Fragment>
        ) : (
          <Spin size="large" style={{ textAlign: "center", marginTop: 50 }} />
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
  clearData: () => dispatch(clearData()),
  fetchUserCourse: id => dispatch(fetchUserCourse(id))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StudentHomePage)
);
