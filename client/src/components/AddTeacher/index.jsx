import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Card, Form, Input, Divider, Button, notification, Icon } from "antd";
import { Wrapper } from "../Wrapper";
import { addTeacher } from "../../actions";
import { connect } from "react-redux";

class AddTeacherForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        this.props.addTeacher(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;

    console.log("teacher", this.props.teacher);

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 }
      }
    };

    return (
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card style={{ width: 800 }} bordered>
          <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
            ADD NEW TEACHER
          </h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Teacher Name">
              {getFieldDecorator("name", {
                rules: [
                  { required: true, message: "Course Title is required!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Teacher Email">
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Teacher email is required!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator("password", {
                rules: [{ required: true, message: "password is required!" }]
              })(<Input.Password />)}
            </Form.Item>

            <Divider />
            {this.props.teacher.loading ? (
              <div>
                <Button
                  style={{ right: 0, float: "right", marginTop: 10 }}
                  type="primary"
                  size="large"
                  htmlType="submit"
                  disabled
                >
                  <Icon type="loading" /> Add Teacher
                </Button>
              </div>
            ) : (
              <div>
                <Button
                  style={{ right: 0, float: "right", marginTop: 10 }}
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
                  Add Teacher
                </Button>
              </div>
            )}
          </Form>
        </Card>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ teacher }) => {
  return { teacher };
};

const mapDispatchToProps = dispatch => ({
  addTeacher: teacher => dispatch(addTeacher(teacher))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form.create({ name: "teacher_form" })(AddTeacherForm))
);
