import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Layout, Menu, Icon, Modal, Button, Dropdown, Avatar } from "antd";
import "./style.css";
import Payments from "../Payments";
import LoginPage from "../LoginPage";
import logo from "../../assets/logo.svg"
import { withRouter, Redirect } from "react-router-dom";
import SearchField from "../SearchField";
import {searchCourse, clearData} from '../../actions'

const menu = (
  <Menu>
    <Menu.Item>
      <a rel="noopener noreferrer" href="http://www.alipay.com/">
        My Profile
      </a>
    </Menu.Item>
    <Menu.Item>
      <a rel="noopener noreferrer" href="/api/logout">
        Logout
      </a>
    </Menu.Item>
  </Menu>
);

class Header extends React.Component {
  state = {
    current: "logo",
    visible: false,
  };


  handleClick = e => {
    this.setState({
      current: e.key
    });
  };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
      current: "logo"
    });
  };

  search = (v) =>{
    console.log('search', v)
    this.props.searchCourse(v)
    this.props.history.push('/search/courses')

  }

  renderContent() {
    
    switch (this.props.auth) {
      case null:
        return;
      case false:
        return (
          <Menu.Item key="signup" style={{ float: "right" }}>
            <a onClick={this.showModal}>Sign in / Sign up</a>
          </Menu.Item>
        );
      default:
        return [
          <Menu.Item key="payments">
            {this.props.auth.isAdmin ? (
              <Link to="/add-teacher">
                <Button ghost>Add Teacher</Button>
              </Link>
            ) : (
              <Payments />
            )}
          </Menu.Item>,
          <Menu.Item key="credits">
            {this.props.auth.isAdmin ? (
              <Link to="/add-course">
                <Button ghost>Add Course</Button>
              </Link>
            ) : (
              <Button
                color="primary"
                style={{ fontSize: 16, color: "black", fontWeight: "bold" }}
              >
                {this.props.auth.credits}&nbsp;Credits
              </Button>
            )}
          </Menu.Item>,
          <Menu.Item key="profile" style={{ float: "right" }}>
            <Dropdown overlay={menu}>
              <div>
                {this.props.auth.isAdmin || !this.props.auth.isTeacher ? (
                  <Avatar
                    src={this.props.auth ? this.props.auth.photo[0].value : ""}
                  />
                ) : (
                  <Icon
                    style={{ fontWeight: "bold", color: "white" }}
                    type="down"
                  />
                )}
              </div>
            </Dropdown>
          </Menu.Item>
        ];
    }
  }

  render() {
    const { Header } = Layout;

    return (
      <div style={{ paddingTop: 65 }}>
        <Header
          style={{
            position: "fixed",
            width: "100%",
            top: 0,
            zIndex: 1,
            paddingBottom: 65
          }}
        >
          <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            theme="dark"
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="logo" style={{ fontSize: 16, color: "white" }}>
              <a
                style={{ color: "white" }}
                href={
                  this.props.auth ? "/home" : "/"
                }
              >
                <Icon type="smile" />
                Hamro Paathsala
               
              </a>
            </Menu.Item>

            {/* <SubMenu
              style={{ fontSize: 16, color: "white" }}
              title={
                <span className="submenu-title-wrapper">
                  <Icon type="heart" />
                  Courses
                </span>
              }
            >
              <MenuItemGroup title="JavaScript">
                <Menu.Item key="setting:1">React js</Menu.Item>
                <Menu.Item key="setting:2">Node js</Menu.Item>
              </MenuItemGroup>
              <MenuItemGroup title="Java">
                <Menu.Item key="setting:3">Beginner's Guide</Menu.Item>
                <Menu.Item key="setting:4">Spring Framework</Menu.Item>
              </MenuItemGroup>
            </SubMenu> */}

            <Menu.Item style={{ fontSize: 16, color: "white" }} key="search">
              <SearchField search={(v)=>this.search(v)} />
            </Menu.Item>

            {this.renderContent()}
          </Menu>
          {!this.props.auth ? (
            <Modal
              title="We are glad you are here."
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              footer={null}
              width={320}
            >
              <LoginPage href="auth/google" />
            </Modal>
          ) : (
            ""
          )}
        </Header>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

const mapDispatchToProps = dispatch =>({
  searchCourse:(value) =>dispatch(searchCourse(value)),
  clearData:() => dispatch(clearData())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
