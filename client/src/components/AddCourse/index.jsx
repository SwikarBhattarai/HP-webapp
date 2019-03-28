import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Icon,
  Divider,
  Modal,
  Select,
  Button,
  notification
} from "antd";
import Upload from '../Upload'
import { Wrapper } from "../Wrapper";
import { addCourse, uploadImage } from "../../actions";
import { connect } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;
const children = [];

children.push(<Option key="All Level">All Level</Option>);
children.push(<Option key="Beginner">Beginner</Option>);
children.push(<Option key="Intermediate">Intermediate</Option>);
children.push(<Option key="Advanced">Advanced</Option>);

const openNotificationSuccess = type => {
  notification[type]({
    message: "Course Added!",
    description: "The students can now view the course :)"
  });
};

const openNotificationError = type => {
  notification[type]({
    message: "Something went wrong!",
    description: "Please try again later :("
  });
};

class AddCourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // normFile = (e) => {
   
  //   console.log('Upload event:', e);
  //   if (Array.isArray(e)) {
  //      this.props.uploadImage(e.file)
  //   }
  //   return e && e.fileList;
     
  // }

  handleChange(e) {
    this.setState({ courseName: e.target.value });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      console.log('form values', values)
      if (!err) {
        if (this.props.course.loading) {
          this.setState({
            loading: true
          });
        } else {
        }
        if (this.props.course.error) {
          openNotificationError("error");
        } else {
          this.props.addCourse(values);
        
         
          openNotificationSuccess("success");
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    };

    console.log('course', this.props.course)

    return (
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Card style={{ width: 1000 }} bordered>
          <h1 style={{ textAlign: "center", fontWeight: "bold" }}>
            ADD NEW COURSE
          </h1>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Course Title">
              {getFieldDecorator("courseTitle", {
                rules: [
                  { required: true, message: "Course Title is required!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Teacher Name">
              {getFieldDecorator("teacherName", {
                rules: [
                  { required: true, message: "Teacher name is required!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Course Price">
              {getFieldDecorator("coursePrice", {
                initialValue: 1,
                rules: [{ required: true, message: "Price is required!" }]
              })(
                <InputNumber
                  min={1}
                  max={500}
                  formatter={value =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\$\s?|(,*)/g, "")}
                />
              )}
            </Form.Item>
            <Form.Item label="Total Videos">
              {getFieldDecorator("totalVideos", {
                initialValue: 1,
                rules: [
                  { required: true, message: "Total Videos is required!" }
                ]
              })(<InputNumber min={1} max={50} />)}
            </Form.Item>
            <Form.Item label="Total Duration">
              {getFieldDecorator("totalDuration", {
                initialValue:1,
                rules: [
                  { required: true, message: "Total Duration is required!" }
                ]
              })(<InputNumber min={1} max={5000} />)}
              <span> Minutes</span>
            </Form.Item>
            <Form.Item label="Course Level">
              {getFieldDecorator("courseLevel", {
                rules: [{ required: true, message: "Level is required!", type:'array' }]
              })(
                <Select
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Please select"
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
            <Form.Item label="Upload a Thumbnail">
              {getFieldDecorator("thumbnail", {
                valuePropName: "thumbnail",
               
              })(
                <input type="file" name="thumbnail" id="thumbnail" />
              )}
            </Form.Item>
            <Divider />
            <Button
              style={{ right: 0, float: "right", marginTop: 10 }}
              type="primary"
              size="large"
              htmlType="submit"
              loading={this.props.loading}
            >
              Submit Course
            </Button>
          </Form>
        </Card>
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ course }) => {
  return { course };
};

const mapDispatchToProps = dispatch => ({
  addCourse: values => dispatch(addCourse(values)),
  uploadImage: image => dispatch(uploadImage(image))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form.create({ name: "course_form" })(AddCourseForm))
);
