import React, { Component } from "react";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { List } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import { Spin } from 'antd'
import { fetchCourse } from "../../actions";
import CourseCard from "../CourseCard";

// const data = [
//   {
//     title: "React JS Complete Course",
//     teacherName: "Swikar Bhattarai",
//     price: 30,
//     status: "locked",
//     addedDate: "2018/01/01",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "All Level",
//     description: "Learn modern react js and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   },
//   {
//     title: "Node JS Complete Course",
//     teacherName: "Bipin Neupane",
//     price: 2,
//     status: "unlocked",
//     addedDate: "2019/01/01",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "Intermediate",
//     description: "Learn modern node js and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   },
//   {
//     title: "Spring Complete Course",
//     teacherName: "Amresh Thakur",
//     price: 5,
//     status: "locked",
//     addedDate: "2019/02/02",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "Beginner",
//     description: "Learn modern spring and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   },
//   {
//     title: "Php Complete Course",
//     teacherName: "Khiman Thapa",
//     price: 3,
//     status: "unlocked",
//     addedDate: "2018/01/03",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "Beginner",
//     description: "Learn modern php and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   },
//   {
//     title: "React JS Complete Course",
//     teacherName: "Swikar Bhattarai",
//     price: 5,
//     status: "locked",
//     addedDate: "2018/01/01",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "All Level",
//     description: "Learn modern react js and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   },
//   {
//     title: "Node JS Complete Course",
//     teacherName: "Bipin Neupane",
//     price: 8,
//     status: "unlocked",
//     addedDate: "2019/01/01",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "Intermediate",
//     description: "Learn modern node js and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   },
//   {
//     title: "Spring Complete Course",
//     teacherName: "Amresh Thakur",
//     price: 10,
//     status: "locked",
//     addedDate: "2019/02/02",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "Beginner",
//     description: "Learn modern spring and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   },
//   {
//     title: "Php Complete Course",
//     teacherName: "Khiman Thapa",
//     price: 3,
//     status: "unlocked",
//     addedDate: "2018/01/03",
//     videosCount: 30,
//     totalDuration: 24,
//     level: "Beginner",
//     description: "Learn modern php and be the best.",
//     features: ["Feature 1", "Feature 2", "Feature 3", "Feature 4", "Feature 5"]
//   }
// ];

// const recentCourse = data.filter((course) =>(
//   course.addedDate ==="unlocked"
// ))

class StudentHomePage extends Component {
  componentDidMount() {
    this.props.fetchCourse();
  }

  render() {
    console.log("course details ", this.props.course.course);

    const { course } = this.props.course;

    console.log("name", course.teacherName);

    const { teacherName } = course;

    console.log("name", teacherName);

    // const unlockedCourse = course.filter(
    //   course => course.status === "unlocked"
    // );

    return (
      <Wrapper>
        <h1>Welcome {this.props.auth.name.givenName},</h1>
        {course ? (
          <React.Fragment>
            <Title>Unlocked Courses!</Title>
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
                dataSource={course}
                renderItem={item => (
                  <List.Item>
                    <CourseCard
                      title={item.title}
                      teacherName={item.teacherName}
                      price={item.price}
                      status={item.status}
                    />
                  </List.Item>
                )}
              />
            </ContentDiv>
            <Title>Recently added courses!</Title>
            <ContentDiv>
              {course && (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3
                  }}
                  dataSource={course}
                  renderItem={item => (
                    <List.Item>
                      <CourseCard
                        title={item.courseTitle}
                        teacherName={item.teacherName}
                        price={item.coursePrice}
                        // level ={this.props.courseLevel}
                        status={item.status}
                        videosCount={item.videosCount}
                        totalDuration={item.totalDuration}
                        description={item.description}
                        thumbnail={item.thumbnail}
                      />
                    </List.Item>
                  )}
                />
              )}
            </ContentDiv>
            <Title>You may also like these courses!</Title>
            <ContentDiv>
              <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 4,
                  lg: 4,
                  xl: 6,
                  xxl: 3
                }}
                dataSource={course}
                renderItem={item => (
                  <List.Item>
                    <CourseCard
                      title={item.title}
                      teacherName={item.teacherName}
                      price={item.price}
                      status={item.status}
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
  fetchCourse: () => dispatch(fetchCourse())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StudentHomePage)
);
