import React from 'react'
import {Layout} from 'antd'
import  './style.css'

const {Footer} = Layout

const FooterNav = () =>(
    <Footer style={{backgroundColor:'#001529', textAlign:'center', color:'white'}}>
      ©2019 by <span style={{color:'#2F54EB'}}>Swikar Bhattarai</span> All Rights Reserved
  </Footer>
  
)

export default FooterNav