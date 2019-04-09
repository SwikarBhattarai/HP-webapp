import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {
  Card,
  Form,
  Input,
  InputNumber,
  Divider,
  Select,
  Button,
  Upload,
  Icon,
  notification
} from "antd";
import { Wrapper } from "../Wrapper";
import { addCourse, uploadImage, uploadVideos } from "../../actions";
import { connect } from "react-redux";
import FormItem from "antd/lib/form/FormItem";

const { Option } = Select;
const { TextArea } = Input;
const children = [];

let id = 0;

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

class AddCourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: "",
      selectedVideos: []
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({ courseName: e.target.value });
  }

  normFile = e => {
    console.log("Upload event:", e);

    return e.file.thumbUrl;
  };

  normVideos = e => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    console.log("e", e);
    console.log("fileList", e.fileList);
    return e && e.fileList;
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.addCourse(values);
        console.log('values', values)
        console.log("course", this.props.course.course);
      }
    });
  };

  remove = k => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k)
    });
  };

  add = () => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue("keys");
    const nextKeys = keys.concat(id++);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys
    });
  };

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;

    console.log("course", this.props.course);

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
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 20, offset: 4 }
      }
    };
    getFieldDecorator("keys", { initialValue: [] });
    const keys = getFieldValue("keys");
    const formItems = keys.map((k, index) => (
      <div>
        <Form.Item
          {...formItemLayout}
          label="Video Details"
          required={false}
          key={k}
        >
          {getFieldDecorator(`videoTitle[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field."
              }
            ]
          })(
            <Input
              name="videoTitle"
              placeholder="Video Title"
              style={{ width: "60%", marginRight: 8 }}
            />
          )}

          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}

          {getFieldDecorator(`videoDescription[${k}]`, {
            validateTrigger: ["onChange", "onBlur"],
            rules: [
              {
                required: true,
                whitespace: true,
                message: "Please input passenger's name or delete this field."
              }
            ]
          })(
            <Input
              name="videoDescription"
              placeholder="Video Description"
              style={{ width: "60%", marginRight: 8 }}
            />
          )}

          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
          {getFieldDecorator(`videoFile[${k}]`, {
            valuePropName: "fileList",
            getValueFromEvent: this.normVideos,

          })(
            <Upload name="fileList" action="/api/uploadVideos" listType="picture">
            <Button>
              <Icon type="upload" /> Click to upload
            </Button>
          </Upload>
          )}

          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={() => this.remove(k)}
            />
          ) : null}
        </Form.Item>
      </div>
    ));

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
                  // { required: true, message: "Course Title is required!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Teacher Name">
              {getFieldDecorator("teacherName", {
                rules: [
                  // { required: true, message: "Teacher name is required!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Course Price">
              {getFieldDecorator("coursePrice", {
                initialValue: 1
                // rules: [{ required: true, message: "Price is required!" }]
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
                  // { required: true, message: "Total Videos is required!" }
                ]
              })(<InputNumber min={1} max={50} />)}
            </Form.Item>
            <Form.Item label="Total Duration">
              {getFieldDecorator("totalDuration", {
                initialValue: 1,
                rules: [
                  // { required: true, message: "Total Duration is required!" }
                ]
              })(<InputNumber min={1} max={5000} />)}
              <span> Minutes</span>
            </Form.Item>
            <Form.Item label="Course Level">
              {getFieldDecorator("courseLevel", {
                // rules: [
                //   {
                //     required: true,
                //     message: "Level is required!",
                //     type: "string"
                //   }
                // ]
              })(
                <Select
                  mode="default"
                  style={{ width: "100%" }}
                  placeholder="Please select"
                >
                  {children}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Description">
              {getFieldDecorator("description", {
                // rules: [{ required: true, message: "Description is required!" }]
              })(
                <TextArea
                  placeholder="Please add course description here"
                  autosize
                />
              )}
            </Form.Item>
            <Form.Item label="Features">
              {getFieldDecorator("feature1", {
                // rules: [{ required: true, message: "Feature 1 is required!" }]
              })(<Input placeholder="Feature 1" allowClear />)}
              {getFieldDecorator("feature2", {
                // rules: [{ required: true, message: "Feature 2 is required!" }]
              })(<Input placeholder="Feature 2" allowClear />)}

              <Input placeholder="Feature 3" allowClear />
              <Input placeholder="Feature 4" allowClear />
              <Input placeholder="Feature 5" allowClear />
            </Form.Item>
            <Form.Item label="Upload a Thumbnail">
              {getFieldDecorator("thumbnail", {
                valuePropName: "file",
                getValueFromEvent: this.normFile
              })(
                <Upload name="file" action="/api/upload" listType="picture">
                  <Button>
                    <Icon type="upload" /> Click to upload
                  </Button>
                </Upload>
              )}
            </Form.Item>

            <FormItem label="Videos">
              {formItems}
            </FormItem>

            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
                <Icon type="plus" /> Add Videos
              </Button>
            </Form.Item>

            <Divider />
            <Button
              style={{ right: 0, float: "right", marginTop: 10 }}
              type="primary"
              size="large"
              htmlType="submit"
            >
              {this.props.course.loading ? <Icon type="loading" /> : ""}
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
  addCourse: fd => dispatch(addCourse(fd))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form.create({ name: "course_form" })(AddCourseForm))
);
