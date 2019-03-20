import React, { Component } from "react";
import {withRouter}  from 'react-router-dom'
import {
  Card,
  Form,
  Input,
  InputNumber,
  Icon,
  Divider,
  Upload,
  Select,
  Button
} from "antd";
import { Wrapper } from "../Wrapper";
import { addCourse } from '../../actions'
import { connect } from 'react-redux'

const { Option } = Select;
const { TextArea } = Input;
const children = [];

children.push(<Option key="All Level">All Level</Option>);
children.push(<Option key="Beginner">Beginner</Option>);
children.push(<Option key="Intermediate">Intermediate</Option>);
children.push(<Option key="Advanced">Advanced</Option>);

class AddCourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      
     
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ courseName: e.target.value });
  }



  handleSubmit = e => {
    console.log(e);
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addCourse(values)
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

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
            ADD NEW COURSE
          </h1>
          <Form onSubmit={this.handleSubmit}>
            <Form.Item label="Course Title">
              {getFieldDecorator("courseTitle", {
                rules: [
                  { required: true, message: "Course Title is required!" }
                ],
              })(<Input onChange={this.handleChange} placeholder="Course Name" />)}
            </Form.Item>
            <Form.Item label="Teacher Name">
              {getFieldDecorator("teacherName", {
                rules: [
                  { required: true, message: "Teacher name is required!" }
                ]
              })(<Input placeholder="Teacher Name" />)}
            </Form.Item>
            <Form.Item label="Course Price">
              {getFieldDecorator("coursePrice", {
                rules: [{ required: true, message: "Price is required!" }]
              })(
                <InputNumber
                  defaultValue={1}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                />
              )}
            </Form.Item>
            <Form.Item label="Total Videos in the Course">
              {getFieldDecorator("totalVideos", {
                rules: [
                  { required: true, message: "Total Videos is required!" }
                ]
              })(<InputNumber min={1} max={50} defaultValue={1} />)}
            </Form.Item>
            <Form.Item label="Total Duration of Videos in Minutes">
              {getFieldDecorator("totalDuration", {
                rules: [
                  { required: true, message: "Total Duration is required!" }
                ]
              })(<InputNumber min={1} max={5000} defaultValue={1} />)}
            </Form.Item>
            <Form.Item label="Course Level">
              {getFieldDecorator("courseLevel", {
                rules: [{ required: true, message: "Level is required!" }]
              })(
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                  defaultValue={[]}
                >
                  {children}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator("description", {
                rules: [{ required: true, message: "Description is required!" }]
              })(
                <TextArea
                  placeholder="Please add course description here"
                  autosize
                />
              )}
            </Form.Item>
            <Form.Item label="Features">
              {getFieldDecorator("feature1", {
                rules: [{ required: true, message: "Feature 1 is required!" }]
              })(<Input placeholder="Feature 1" allowClear />)}
              {getFieldDecorator("feature2", {
                rules: [{ required: true, message: "Feature 2 is required!" }]
              })(<Input placeholder="Feature 2" allowClear />)}

              <Input placeholder="Feature 3" allowClear />
              <Input placeholder="Feature 4" allowClear />
              <Input placeholder="Feature 5" allowClear />
            </Form.Item>
            <Divider />
            <Button
              style={{ right: 0, float: "right", marginTop: 10 }}
              type="primary"
              size="large"
              htmlType="submit"
            >
              Submit Course
            </Button>
          </Form>
        </Card>
      </Wrapper>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  addCourse: values => dispatch(addCourse(values))
})

// const AddCourse = connect(mapDispatchToProps, (AddCourseForm));

export default withRouter(
  connect(
    null,
    mapDispatchToProps,
  )(Form.create({name: 'course_form'})(AddCourseForm)));