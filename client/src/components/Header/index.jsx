import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

import { Layout, Menu, Icon, Modal, Button, Dropdown} from 'antd'
import './style.css'

import Payments from '../Payments'
import LoginPage from '../LoginPage'

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const menu = (
  <Menu>
    <Menu.Item>
      <a  rel="noopener noreferrer" href="http://www.alipay.com/">My Profile</a>
    </Menu.Item>
    <Menu.Item>
      <a  rel="noopener noreferrer" href="api/logout">Logout</a>
    </Menu.Item>
  </Menu>
);

class Header extends React.Component {
  state = {
    current: 'logo',
    visible:false,
  }

  handleClick = (e) => {
    this.setState({
      current: e.key,
    });
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      current:'logo'
    });
  }


 

 

    renderContent(){
    
    switch(this.props.auth){
      case null:
        return 
      case false:
        return (
        

        <Menu.Item key="signup" style={{float:'right'}} >
          <a onClick={this.showModal}>Sign in / Sign up</a>
        </Menu.Item>
        
        )     
      default:
        return[
         
            <Menu.Item key="payments" >
              <Payments />
            </Menu.Item>,
            <Menu.Item key="credits">
              <Button color="primary" style={{fontSize:16, color:'black', fontWeight:'bold'}}>{this.props.auth.credits}&nbsp;Credits</Button>
            </Menu.Item>,
            <Menu.Item key="profile" style={{float:'right'}}>
              <Dropdown overlay={menu}>
                  <Icon type="user" style={{color:'white', fontSize:16}} />
              </Dropdown>
            </Menu.Item>
         
       
        ]
       
    }
  }


  render() {
    const {Header} = Layout;
  
   
    return (
      <div style={{paddingTop:65}}>
      <Header style={{ position: 'fixed', width: '100%', 
      top: 0, zIndex:1, paddingBottom:65
      }}>
        <Menu
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        mode="horizontal"
        theme="dark"
        style={{lineHeight:'64px'}}
       
        >
        
        <Menu.Item key="logo" style={{fontSize:16, color:'white'}}>
          <a href="#" style={{color:'white'}}><Icon type="smile" />Hamro Paathsala</a>
        </Menu.Item>
       
        <SubMenu style={{fontSize:16, color:'white'}} title={<span className="submenu-title-wrapper"><Icon type="heart" />Courses</span>}>
          <MenuItemGroup title="JavaScript">
            <Menu.Item key="setting:1">React js</Menu.Item>
            <Menu.Item key="setting:2">Node js</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Java">
            <Menu.Item key="setting:3">Beginner's Guide</Menu.Item>
            <Menu.Item key="setting:4">Spring Framework</Menu.Item>
          </MenuItemGroup>
        </SubMenu>

        <Menu.Item style={{fontSize:16, color:'white'}} key="search">
          <Icon type="search" />Search
        </Menu.Item>



      {this.renderContent()}
        
      </Menu>
      <Modal
          title="We are glad you are here."
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={null}
          width={320}
          
        >
         <LoginPage href="auth/google"  />
          
        </Modal>
      </Header>

      </div>

    );
  }
}

function mapStateToProps({ auth }){
  return { auth };
}



export default connect (mapStateToProps)(Header)

