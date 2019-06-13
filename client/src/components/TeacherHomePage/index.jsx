import React, { Component } from "react";
import { Wrapper, Title, ContentDiv } from "../Wrapper";
import ColorCard from "../ColorCard";
import { List } from "antd";
import CourseCard from "../CourseCard";
import { connect } from "react-redux";
import { fetchTeacherCourse } from "../../actions";

class TeacherHomePage extends Component {
  componentDidMount() {
    this.fetchTeacherCourse();
  }

  fetchTeacherCourse() {
    this.props.fetchTeacherCourse(this.props.auth.name);
  }

  sumPrice(input) {
    if (toString.call(input) !== "[object Array]") return false;

    var total = 0;
    for (var i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
        continue;
      }
      total += Number(input[i]);
    }
    return total;
  }



  render() {
    const { teacherCourse } = this.props.course;

    const newArray = [];

    teacherCourse && teacherCourse.map((teacher) => newArray.push(teacher.coursePrice))

    const totalPrice = this.sumPrice(newArray)
    return (
      <Wrapper>
        <Title>Welcome Teacher,</Title>
        <ContentDiv>
          <ColorCard
            section1="Courses"
            section2="Students"
            section3="Earnings"
            value1={teacherCourse.length}
            value2="1"
            value3={totalPrice}
            icon3="dollar"
          />
        </ContentDiv>
        {teacherCourse ? (
          <ContentDiv>
            <Title>Your Courses!</Title>
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
              dataSource={teacherCourse}
              renderItem={item => (
                <List.Item>
                  <CourseCard
                    title={item.courseTitle}
                    teacherName={item.teacher}
                    price={item.coursePrice}
                    level={item.courseLevel}
                    totalVideos={item.totalVideos}
                    totalDuration={item.totalDuration}
                    description={item.description}
                    thumbnail={item.thumbnail}
                    features={item.feature}
                    item={item}
                    totalEarnings={item.coursePrice}
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

const mapStateToProps = ({ auth, course }) => {
  return { auth, course };
};

const mapDispatchToProps = dispatch => ({
  fetchTeacherCourse: teacher => dispatch(fetchTeacherCourse(teacher))
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherHomePage);
