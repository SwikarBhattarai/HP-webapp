import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import  * as actions from '../../actions'

import Header from '../Header'
import Landing from '../LandingPage'
import StudentHomePage from '../StudentHomePage'
import StudentCourseVideoPage from '../StudentCourseVideoPage'
import {Layout} from 'antd'

import './app.css'
import { Affix } from 'antd';
import FooterNav from '../Footer';

const AdminHomePage = () =>(
  <div>
    This is Admin Home Page
  </div>
)

const TeacherHomePage = () =>(
  <div>
    This is Teacher Home Page
  </div>
)



class App extends Component {
  componentDidMount(){
    this.props.fetchUser()
 
  }

  renderRoute(){
    if(this.props.auth){
     
    
      if(this.props.auth.isAdmin){
        return(
         
          <Route path = "/home" component ={AdminHomePage} />
        
        )
      }
      else if(this.props.auth.isTeacher){
        return (
          <Route path="/home" component={TeacherHomePage} />
        )
      }else{
        return(
          [
            <Route exact key="home" path="/home" component={StudentHomePage} />,
            <Route exact key="video" path="/courseId" component={StudentCourseVideoPage} />
          ]
          
        )
      }
    }else{
      return(
        <Route exact path="/" component = {Landing} /> 
      )
    }
   
  }

  render() {
    if(this.props.auth){
      console.log(this.props.auth.isAdmin)
    }
    const {Footer, Content} = Layout
  
    return (
      <div className="app">
        <BrowserRouter>
          <Layout>
            <Header />
              <Content>
              {this.renderRoute()}
              </Content>
            <FooterNav />   
          </Layout>
        </BrowserRouter>
      </div>
    )
  }
}

function mapStateToProps({ auth }){
  return { auth };
}

export default connect(mapStateToProps, actions) (App)
