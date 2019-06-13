import React from "react";
import { Form, Icon, Input, Button, message } from "antd";
import { loginUsers } from "../../actions";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import "./style.css";

class NormalLoginForm extends React.Component {
  state = {
    auth: true,
    errorOccurred:false,
  };

  componentDidMount(){
    const {auth} = this.props
    console.log('mount', auth)
  }

  handleSubmit = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        e.preventDefault();
        console.log("Received values of form: ", values);
        this.props.loginUsers(values);
        
      }
    });
  };





  render() {
    const { getFieldDecorator } = this.props.form;
    const { auth } = this.props;

   

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <div style={{ marginBottom: 20 }}>
          <h5 style={{ fontStyle: "italic" }}>For Students</h5>
          <Button
            style={{ backgroundColor: "#DB4437", color: "white" }}
            href={this.props.href}
            className="button"
            className="login-form-button"
          >
            <Icon type="google" />
            LOG IN WITH GOOGLE
          </Button>
        </div>
        <div>
          <h5 style={{ fontStyle: "italic" }}>For Teachers</h5>
          <Form.Item>
            {getFieldDecorator("email", {
              rules: [{ required: true, message: "Please input your email!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="email"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Please input your Password!" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="Password"
              />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(
              <a style={{fontSize:12}}>
                Forgot Password? Contact HP Admin.
              </a>
            )}

            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
      
        </div>
      </Form>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};

const mapDispatchToProps = dispatch => ({
  loginUsers: user => dispatch(loginUsers(user))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form.create({ name: "normal_login" })(NormalLoginForm))
);
