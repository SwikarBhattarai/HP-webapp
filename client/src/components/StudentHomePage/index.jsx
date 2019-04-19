import React, { Component } from "react";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { List } from "antd";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import "./style.css";
import { Spin } from "antd";
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

    const unlockedCourse = course
      ? course.filter(course => course.status === "unlocked")
      : "";

 
      (function(){
        if (typeof Object.defineProperty === 'function'){
          try{Object.defineProperty(Array.prototype,'sortBy',{value:sb}); }catch(e){}
        }
        if (!Array.prototype.sortBy) Array.prototype.sortBy = sb;
      
        function sb(f){
          for (var i=this.length;i;){
            var o = this[--i];
            this[i] = [].concat(f.call(o,o,i),o);
          }
          this.sort(function(a,b){
            for (var i=0,len=a.length;i<len;++i){
              if (a[i]!=b[i]) return a[i]<b[i]?-1:1;
            }
            return 0;
          });
          for (var i=this.length;i;){
            this[--i]=this[i][this[i].length-1];
          }
          return this;
        }
      })();

      const recentCourse = course ? course.sortBy(function(o){
        return o.addedTime
      }) : ''

    return (
      <Wrapper>
        <h1>Welcome {this.props.auth.name.givenName},</h1>
        {course ? (
          <React.Fragment>
            {unlockedCourse.length > 0 ? (
              <ContentDiv>
                <Title>Unlocked Courses!</Title>
                <List
                style={{marginTop:12}}
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
                        teacherName={item.teacher.name}
                        price={item.coursePrice}
                        level={item.courseLevel}
                        status={item.status}
                        totalVideos={item.totalVideos}
                        totalDuration={item.totalDuration}
                        description={item.description}
                        features={item.feature}
                        thumbnail={item.thumbnail}
                        id={item._id}
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
                dataSource={recentCourse.slice(0,5)}
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
                      features={item.feature}
                      thumbnail={item.thumbnail}
                      id={item._id}
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentHomePage);
