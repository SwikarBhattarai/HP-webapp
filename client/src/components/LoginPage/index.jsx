import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { loginUsers } from "../../actions";
import { connect } from "react-redux";

import { withRouter } from "react-router-dom";

import "./style.css";

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        e.preventDefault();
        console.log("Received values of form: ", values);
        this.props.loginUsers(values);
        this.props.history.push("/home");
        console.log('aaaa', this.props.state)
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    console.log("userss", this.props.login);

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator("email", {
            rules: [{ required: true, message: "Please input your email!" }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="email"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Please input your Password!" }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
            />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator("remember", {
            valuePropName: "checked",
            initialValue: true
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="">
            Forgot password
          </a>

          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Button
            style={{ backgroundColor: "#DB4437", color: "white" }}
            href={this.props.href}
            className="button"
            className="login-form-button"
          >
            <Icon type="google" />
            LOG IN WITH GOOGLE
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const mapStateToProps = ( state) => {
  return { state };
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
