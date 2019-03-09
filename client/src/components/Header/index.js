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
  <Menu style={{right:50}}>
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
        

        <Menu.Item key="signup" style={{position:'absolute', right:0}} >
          <a onClick={this.showModal}>Sign in / Sign up</a>
        </Menu.Item>
        
        )     
      default:
        return[
         
            <Menu.Item key="payments" >
              <Payments />
            </Menu.Item>,
            <Menu.Item key="credits">
              <Button color="primary" style={{fontSize:16, color:'red', fontWeight:'bold'}}>Credits:{' '}{this.props.auth.credits}</Button>
            </Menu.Item>,
            <Menu.Item key="profile" style={{position:'absolute', right:50}} >
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
      <Header>
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
      
    );
  }
}




// class Header extends Component {
//   constructor(props) {
//     super(props)

//     this.toggle = this.toggle.bind(this)
//     this.state = {
//       isOpen: false
//     }
//   }
//   toggle() {
//     this.setState({
//       isOpen: !this.state.isOpen
//     })
//   }
 
//   renderContent(){
//     switch(this.props.auth){
//       case null:
//         return 
//       case false:
//         return (
//           <div className="nav">

//           <NavLink href="/auth/google"><Button color="info">Login</Button></NavLink>
//           </div>
//         )     
//       default:
//         return [
//           <div style={{display:'flex'}} key="1">
//             <NavLink><Payments/></NavLink>,
//             <NavLink><Button>Credits: {this.props.auth.credits}</Button></NavLink>,
//             <NavLink href="api/logout"><Button color="danger">Logout</Button></NavLink>
//           </div>  
        
//         ] 
//     }
//   }

//   render() {
//     return (
//       <div>
//         <Navbar color="navbar navbar-dark bg-dark" expand="md">
//           <NavbarBrand><Link to={this.props.auth ? '/home' : '/'} style={{textDecoration:'none', color:'white'}}>Hamro Paathsala</Link></NavbarBrand>
//           <NavbarToggler onClick={this.toggle} />
//           <Collapse isOpen={this.state.isOpen} navbar>
//             <Nav className="ml-auto" navbar>
//               {/* <NavItem>
//                 <NavLink href="/">Getting Started</NavLink>
//               </NavItem> */}
//               <NavItem>
//                 {this.renderContent()}
//               </NavItem>
//               {/* <UncontrolledDropdown nav inNavbar>
//                 <DropdownToggle nav caret>
//                   Options
//                 </DropdownToggle>
//                 <DropdownMenu right>
//                   <DropdownItem>
//                     Option 1
//                   </DropdownItem>
//                   <DropdownItem>
//                     Option 2
//                   </DropdownItem>
//                   <DropdownItem divider />
//                   <DropdownItem>
//                     Reset
//                   </DropdownItem>
//                 </DropdownMenu>
//               </UncontrolledDropdown> */}
//             </Nav>
//           </Collapse>
//         </Navbar>
//       </div>
//     )
//   }
// }

function mapStateToProps({ auth }){
  return { auth };
}

export default connect (mapStateToProps) (Header)

