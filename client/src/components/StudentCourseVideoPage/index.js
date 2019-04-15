import React, { Component } from "react";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { Breadcrumb } from "antd";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import { Card } from "antd";
import VideoCard from '../VideoCard'
import VideosScrollBar from "../VideosScrollBar";
import { fetchSingleCourse } from "../../actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";


class StudentCourseVideoPage extends Component {
  componentWillMount(){
    this.props.fetchSingleCourse(this.props.match.params.courseId)
  }
  render() {
    console.log('course', this.props.singleCourse)
    console.log(this.props);
    return (
      <Wrapper>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a>Video Name</a>
        </Breadcrumb.Item>
        <ContentDiv
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <VideoCard />
            <Title>Overview</Title>
            <Card
              title="1. Introduction to the Course"
              style={{ marginTop: 10, width: 960 }}
            >
              <p>Description of the Video.</p>
            </Card>
          </div>

          <div>
            <Title style={{ fontWeight: 900, marginBott0m: 20 }}>
              VIDEO PLAYLISTS
            </Title>
            <VideosScrollBar />
          </div>
        </ContentDiv>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ auth, singleCourse }) => {
  return { auth, singleCourse };
};

const mapDispatchToProps = dispatch => ({
  fetchSingleCourse: courseId => dispatch(fetchSingleCourse(courseId))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(StudentCourseVideoPage)
);
