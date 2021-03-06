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
  notification,
  message,
  Spin,
} from "antd";
import { Wrapper } from "../Wrapper";
import { addCourse, fetchTeachers } from "../../actions";
import { connect } from "react-redux";

const { Option } = Select;
const { TextArea } = Input;
const children = [];

let id = 0;

children.push(<Option key="All Level">All Level</Option>);
children.push(<Option key="Beginner">Beginner</Option>);
children.push(<Option key="Intermediate">Intermediate</Option>);
children.push(<Option key="Advanced">Advanced</Option>);

const openNotification = type => {
  notification[type]({
    message: "Course Added!",
    description: "The course was added successfully."
  });
};

class AddCourseForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      courseId: 0,
      disabled: false,
      selectedFile: "",
      selectedVideos: [],
      title: "",
      description: "",
      file: "",
      videos: [{ title: "", description: "", file: "" }]
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.fetchTeachers();
  }

  handleChange(e) {
    this.setState({ courseName: e.target.value });
  }

  normFile = e => {
    console.log("Upload event:", e);
    if (e.file.status === "done") {
      const response = e.file.response.url;
      return response;
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("values", values);
        console.log("videos", this.state.videos);
        this.setState({
          loading: true
        });
        const data = {
          courseId: this.state.courseId,
          courseDetails: values,
          videos: this.state.videos
        };

        console.log("values", data);

        this.props.addCourse(data);
        this.setState({
          courseId: this.state.courseId + 1
        });
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
    this.setState({
      videos: this.state.videos.concat([
        {
          title: "",
          description: "",
          file: ""
        }
      ])
    });
    console.log("state", this.state.videos);
  };

  handleVideoTitleChange = i => evt => {
    console.log("title", evt.target.value);
    const newVideo = this.state.videos.map((video, k) => {
      if (i !== k) return video;
      return { ...video, title: evt.target.value };
    });

    this.setState({ videos: newVideo });
  };

  handleDescriptionChange = i => evt => {
    console.log("description", evt.target.value);
    const newVideo = this.state.videos.map((video, k) => {
      if (i !== k) return video;
      return { ...video, description: evt.target.value };
    });

    this.setState({ videos: newVideo });
  };

  handleFileChange = i => evt => {
    if (evt.file.status === "done") {
      const response = evt.file.response.url;
      const newVideo = this.state.videos.map((video, k) => {
        if (i !== k) return video;
        return { ...video, file: response };
      });
      this.setState({
        videos: newVideo,
        disabled: false
      });
    } else {
      this.setState({ disabled: true });
    }

    if (evt.file.status === "removed") {
      this.setState({
        disabled: false
      });
    }

    console.log("videos", this.state.videos);
  };

  // handleFileRemove =(i) =>{
  //   console.log('i', i)
  //   this.setState({
  //     disabled: !this.state.disabled,
  //   })
  // }

  render() {
    console.log("teachers", this.props.teachers);
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

    const formItems = this.state.videos.map((video, i) => (
      <Form.Item {...formItemLayout} label="Video Details">
        <Input
          name="videoTitle"
          placeholder="Video Title"
          onChange={this.handleVideoTitleChange(i)}
          style={{ width: "60%", marginRight: 8 }}
        />
        <Input
          name="videoDescription"
          placeholder="Video Description"
          style={{ width: "60%", marginRight: 8 }}
          onChange={this.handleDescriptionChange(i)}
        />
        <Upload
          name="fileList"
          onChange={this.handleFileChange(i)}
          action="/api/uploadVideos"
          listType="picture"
          // onRemove={this.handleFileRemove}
        >
          <Button>
            <Icon type="upload" /> Click to upload
          </Button>
        </Upload>
      </Form.Item>
    ));

    return (
      <Wrapper
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
      {this.props.course ?(
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
          <Form.Item label="Teacher">
            {getFieldDecorator("teacher", {
              rules: [
                { required: true, message: "Teacher name is required!" }
              ]
            })(
              <Select
                placeholder="select a teacher..."
                style={{ width: 200 }}
              >
                {this.props.course.teachers
                  ? this.props.course.teachers.map((teacher, i) => (
                      <Option value={teacher.name}>{teacher.name}</Option>
                    ))
                  : ""}
              </Select>
            )}
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
              initialValue: 1,
              rules: [
                { required: true, message: "Total Duration is required!" }
              ]
            })(<InputNumber min={1} max={5000} />)}
            <span> Minutes</span>
          </Form.Item>
          <Form.Item label="Course Level">
            {getFieldDecorator("courseLevel", {
              rules: [
                {
                  required: true,
                  message: "Level is required!",
                  type: "string"
                }
              ]
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
              valuePropName: "file",
              getValueFromEvent: this.normFile,
              rules: [{ required: true, message: "Thumbnail is required!" }]
            })(
              <Upload name="file" action="/api/upload" listType="picture">
                <Button>
                  <Icon type="upload" /> Click to upload
                </Button>
              </Upload>
            )}
          </Form.Item>
          {formItems}
          <Form.Item {...formItemLayoutWithOutLabel}>
            <Button
              type="dashed"
              disabled={this.state.disabled}
              onClick={this.add}
              style={{ width: "60%" }}
            >
              <Icon type="plus" /> Add Videos
            </Button>
          </Form.Item>

          <Divider />
          <Button
            style={{ right: 0, float: "right", marginTop: 10 }}
            type="primary"
            size="large"
            htmlType="submit"
            disabled={this.state.disabled}
          >
            {this.props.course.loading ? (
              <Icon type="loading" />
            ) : (
              ''
            )}
            Submit Course
          </Button>
        </Form>
      </Card>
      ):(
        <Spin />
      )}
        
      </Wrapper>
    );
  }
}

const mapStateToProps = ({ course }) => {
  return { course };
};

const mapDispatchToProps = dispatch => ({
  addCourse: fd => dispatch(addCourse(fd)),
  fetchTeachers: () => dispatch(fetchTeachers())
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Form.create({ name: "course_form" })(AddCourseForm))
);
