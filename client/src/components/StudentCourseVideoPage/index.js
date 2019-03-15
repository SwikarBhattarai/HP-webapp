import React, { Component } from 'react';
import { Wrapper, ContentDiv, Title } from '../Wrapper';
import { Breadcrumb } from 'antd';
import VideoPlayer from '../VideoCard';
import { Card } from 'antd';
import VideosScrollBar from '../VideosScrollBar';

const videoJsOptions = {
  autoplay: false,
  controls: true,
  sources: [
    {
      src: '//vjs.zencdn.net/v/oceans.mp4',
      type: 'video/mp4',
    },
  ],
};

export default class index extends Component {
  render() {
    return (
      <Wrapper>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>
          <a>Video Name</a>
        </Breadcrumb.Item>
        <ContentDiv style={{ display: 'flex', flexDirection: 'row', justifyContent:'space-around' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <VideoPlayer {...videoJsOptions} />
            <Title>Overview</Title>
            <Card
              title="1. Introduction to the Course"
              style={{ marginTop: 10, width: 960 }}
            >
              <p>Description of the Video.</p>
            </Card>
          </div>

          <div>
            <Title style={{fontWeight:900, marginBottm:20}}>VIDEO PLAYLISTS</Title>
            <VideosScrollBar />
          </div>
        </ContentDiv>
      </Wrapper>
    );
  }
}
