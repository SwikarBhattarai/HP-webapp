import React from 'react'
import {Wrapper} from '../Wrapper'
import Carousel1 from '../../assets/carousel1.jpg'
import Carousel2 from '../../assets/carousel2.jpg'
import Carousel3 from '../../assets/carousel3.jpg'
import './style.css'

import { Layout, Carousel, Typography } from 'antd'




class Landing extends React.Component {

  
  render() {

    console.log('auth land', this.props.auth)
    const {
     Content
    } = Layout
    const { Title } = Typography
    return (
      <div className="scrollable-container" ref={(node) => { this.container = node; }}>
        <Layout>
       
         <Content style={{backgroundColor:'#252324'}}>
          <Carousel autoplay style="darken">
            <div><img src={Carousel1} style={{height:800, width:'100%'}} /></div>
            <div><img src={Carousel3} style={{height:800, width:'100%'}} /></div>
         
          </Carousel>
          <div style={{display:'flex', flexDirection:'column'}}>
          <h1 className="text">हाम्रो पाठशाला</h1>
          <h4 className="caption">"Online learning is not the next big thing, it is the now big thing.” - Donna J. Abernathy</h4>
          </div>
        
         </Content>
         
        </Layout>
        
      </div>
    );
  }
}


export default Landing