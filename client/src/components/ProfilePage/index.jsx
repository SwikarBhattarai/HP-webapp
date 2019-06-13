import React, { Component } from 'react'
import {Wrapper}   from '../Wrapper'
import {Card, Avatar,Form, Input,} from 'antd'
// import { addCourse, fetchTeachers } from "../../actions";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class ProfilePage extends Component {
 
  render() {

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
      <Wrapper   style={{
        display: "flex",
        flexDirection:'column',
        justifyContent: "center",
        alignItems: "center"
      }}>
        {this.props.auth && (
           <Card style={{width:800}}>
           <div style={{textAlign:'center', marginBottom:20}}>
           <Avatar src={this.props.auth.photo[0].value} size={100} icon="user" style={{textAlign:'center'}} />
           </div>
          
           <Form {...formItemLayout}>
             <Form.Item label="Email">
               <Input value={this.props.auth.email[0].value} disabled />
             </Form.Item>
             <Form.Item label="Name">
               <Input value={this.props.auth.name.givenName + ' '+ this.props.auth.name.familyName} disabled />
             </Form.Item>
            
           </Form>
         </Card>
        )}
       
      </Wrapper>
    )
  }
}

const mapStateToProps = ({ auth }) => {
  return { auth };
};



export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(Form.create({ name: "profile_form" })(ProfilePage))
);
