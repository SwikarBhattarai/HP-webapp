import React, { Component } from "react";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { Breadcrumb } from "antd";
import { Card, Spin, List, Avatar, Icon } from "antd";
import VideoCard from "../VideoCard";
import VideosScrollBar from "../VideosScrollBar";
import { fetchSingleCourse } from "../../actions";
import { withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { connect } from "react-redux";

class StudentCourseVideoPage extends Component {
  state = {
    videos: [],
    video: {
      file: "",
      description: "",
      title: ""
    },
    clicked: false
  };
  componentWillMount() {
    console.log("big ", this.props);
    this.props.fetchSingleCourse(this.props.match.params.courseId);
  }

  componentDidUpdate() {
    if (this.props.course.singleCourse.videos) {
      console.log("props", this.props.course.singleCourse.videos[0]);
      if (!this.state.video.file) {
        this.setState({
          video: reactLocalStorage.getObject("video"),
          videos: this.props.course.singleCourse.videos
        });
      }
    }
  }

  componentDidMount() {
    if (
      reactLocalStorage.getObject("video") &&
      this.props.course.singleCourse.videos
    ) {
      console.log("localstorage", reactLocalStorage.getObject("video"));
      this.setState({
        video: reactLocalStorage.getObject("video"),
        videos: this.props.course.singleCourse.videos
      });
    }
  }
  // if(this.props.course.course.videos){
  //   console.log('props', this.props.course.course.videos[0])
  //   if(this.state.video.file){
  //     this.setState({
  //       videos: this.props.course.course.videos
  //     })
  //   }

  //   // }
  // }

  // if(localStorage.getItem('file')){
  //   const file = localStorage.getItem('file')
  //   const title = localStorage.getItem('title')
  //   this.setState({
  //     video:{
  //       file:file,
  //       title:title,
  //     }
  //   })
  // }

  refresh() {
    this.setState({
      video: {
        title: "",
        file: "",
        description: ""
      }
    });
  }

  getState() {
    var selectedState = localStorage.getItem("");
  }

  handleItemClick = e => {
    reactLocalStorage.setObject("video", {
      file: e.file,
      title: e.title,
      description: e.description
    });

    window.location.reload();

    // console.log('file', localStorage.getItem('file'))
    // this.setState({

    //   video:{
    //     title:localStorage.getItem('title'),
    //     file:localStorage.getItem('file'),
    //     description:localStorage.getItem('description'),
    //   },
    //   preload:true,
    // })
  };

  render() {
    const { videos } = this.props.course.singleCourse;

    console.log('singleCourse', this.props.course.singleCourse)

    console.log("video", this.state.video);
    console.log("videos", this.state.videos);

    const video = (videos || [])[0];

    console.log("vido", video);

    return (
      <Wrapper>
        {this.state.video.file ||
        this.state.video.title ||
        this.state.video.description ? (
          <div>
            <Breadcrumb.Item>
              <a href="/home">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>{this.state.video.title}</a>
            </Breadcrumb.Item>
            <ContentDiv
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: 20
                }}
              >
                <VideoCard
                  src={this.state.video.file}
                  preload={this.state.preload}
                />
                <Title>Overview</Title>
                <Card
                  title={this.state.video.title}
                  style={{ marginTop: 10, width: 800 }}
                >
                  <p>{this.state.video.description}</p>
                </Card>
              </div>
              <div>
                <text
                  style={{
                    fontWeight: "bold",
                    fontSize: 24,
                    margin: 0,
                    padding: 0
                  }}
                >
                  VIDEO PLAYLISTS
                </text>
                <Card style={{ maxHeight: 500, overflow: "auto" }}>
                  <List
                    style={{ maxHeight: 500, align:'justify' }}
                    itemLayout="horizontal"
                    dataSource={this.state.videos}
                    renderItem={item => (
                      <List.Item
                        onClick={() => this.handleItemClick(item)}
                        style={{
                          cursor: "pointer"
                        }}
                      >
                        <div style={{display:'flex'}}>
                          <Icon
                            style={{ color: "blue", fontSize: 24 }}
                            type="play-circle"
                          />
                          <h1 style={{ marginLeft: 10, fontSize:16, fontWeight:'bold' }}>{item.title}</h1>
                        </div>

                      </List.Item>
                    )}
                  />
                </Card>
              </div>
            </ContentDiv>
          </div>
        ) : (
          <Spin />
        )}
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ course }) => {
  return { course };
};
const mapDispatchToProps = dispatch => ({
  fetchSingleCourse: courseId => dispatch(fetchSingleCourse(courseId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCourseVideoPage);
