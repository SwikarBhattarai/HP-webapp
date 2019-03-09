import React from 'react'
import {Affix} from 'antd'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import {Wrapper} from '../../components/Wrapper'
import Carousel1 from '../../assets/carousel1.jpg'
import Carousel2 from '../../assets/carousel2.jpg'
import Carousel3 from '../../assets/carousel3.jpg'
import './style.css'

import { Layout, Carousel, Typography } from 'antd'


class Landing extends React.Component {
  render() {
    const {
     Content
    } = Layout
    const { Title } = Typography
    return (
      <div className="scrollable-container" ref={(node) => { this.container = node; }}>
        <Layout>
       
         <Content style={{backgroundColor:'#252324'}}>
          <Carousel autoplay>
            <div><img src={Carousel2} style={{height:800, width:'100%'}} /></div>
            <div><img src={Carousel1} style={{height:800, width:'100%'}} /></div>
            <div><img src={Carousel3} style={{height:800, width:'100%'}} /></div>
         
          </Carousel>
          <Wrapper>
          <Title level={2}>New Courses</Title>
          </Wrapper>
         </Content>
         <Footer />
        </Layout>
        
      </div>
    );
  }
}

export default Landing