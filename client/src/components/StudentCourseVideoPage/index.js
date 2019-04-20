import React, { Component } from "react";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { Breadcrumb } from "antd";
import { Card, Spin, List, Avatar, Icon } from "antd";
import VideoCard from "../VideoCard";
import VideosScrollBar from "../VideosScrollBar";
import { fetchSingleCourse, clearData } from "../../actions";
import { withRouter } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
import { connect } from "react-redux";

class StudentCourseVideoPage extends Component {

  state={
    id:'',
  }
  
  componentWillMount() {
    console.log("big ", this.props);
    this.props.fetchSingleCourse(this.props.match.params.courseId);
    }

  componentWillUnmount(){
    this.props.clearData()
  }

    componentDidUpdate(prevProps){
      const {match, course} = this.props
      if(match.params.videoId !==prevProps.match.params.videoId){
        this.props.fetchSingleCourse(this.props.match.params.courseId)
      }
    }
  
  componentDidMount(){
    this.props.fetchSingleCourse(this.props.match.params.courseId)
  }
  


  handleItemClick = item => {
    console.log('item', item)
    if(this.props.course.singleCourse.videos){
      const id = item._id
    this.props.history.push(`/course/${this.props.match.params.courseId}/video/${id}`)
    }
  };



  render() {
    const { videos } = this.props.course.singleCourse;
    const {match} = this.props

    const video = this.props.course.singleCourse ? videos.find((video)=> match.params.videoId === video._id) : ''

    console.log('video', video)

    return (
      <Wrapper>
        {this.props.course.singleCourse.videos ? (
          <div>
            <Breadcrumb.Item>
              <a href="/home">Home</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <a>{video.title}</a>
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
                  src={video.file}
                />
                <Title>Overview</Title>
                <Card
                  title={video.title}
                  style={{ marginTop: 10, width: 800 }}
                >
                  <p>{video.description}</p>
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
                    dataSource={videos}
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
  fetchSingleCourse: courseId => dispatch(fetchSingleCourse(courseId)),
  clearData:() => dispatch(clearData())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentCourseVideoPage);
