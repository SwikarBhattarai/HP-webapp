import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";

import { Layout } from "antd";

import FooterNav from "../Footer";
import Header from "../Header";
import Landing from "../LandingPage";
import StudentHomePage from "../StudentHomePage";
import StudentCourseVideoPage from "../StudentCourseVideoPage";

import AdminHomePage from "../AdminHomePage";
import TeacherHomePage from "../TeacherHomePage";
import AddCourse from "../AddCourse";
import AddTeacher from "../AddTeacher";
import EditCourse from "../EditCourse";
import SearchPage from "../SearchPage";
import ProfilePage from '../ProfilePage';

import "./app.css";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderRoute() {
    console.log("auth", this.props.auth);
    if (this.props.auth) {
      if (this.props.auth.isAdmin) {
        return [
          <Route exact path="/home" component={AdminHomePage} />,
          <Route exact path="/" component={AdminHomePage} />,
          <Route exact path="/add-course" component={AddCourse} />,
          <Route exact path="/add-teacher" component={AddTeacher} />,
          <Route exact path="/:id/edit" component={EditCourse} />,
          <Route
          exact
          key="search"
          path="/search/courses"
          component={SearchPage}
        />,
        <Route exact key="profile" path="/profile" component={ProfilePage} />
        ];
      } else if (this.props.auth.isTeacher) {
        return [
          <Route exact path="/home" component={TeacherHomePage} />,
          <Route exact path="/" component={TeacherHomePage} />,
          <Route exact key="profile" path="/profile" component={ProfilePage} />
        ];
      } else {
        return [
          <Route exact key="home" path="/home" component={StudentHomePage} />,
          <Route exact key="home" path="/" component={StudentHomePage} />,
          <Route
            path="/course/:courseId/video/:videoId"
            component={StudentCourseVideoPage}
          />,
          <Switch>
            <Route
              exact
              key="search"
              path="/search/courses"
              component={SearchPage}
            />
             <Route
              exact
              key="profile"
              path="/profile"
              component={ProfilePage}
            />
          </Switch>
        ];
      }
    } else {
      return <Route exact path="/" component={Landing} />;
    }
  }

  render() {
    if (this.props.auth) {
      console.log(this.props.auth.isAdmin);
    }
  
    return (
      <div className="app">
        <BrowserRouter>
          <div id="page-container">
            <Header />
            <div id="content-wrap">{this.renderRoute()}</div>
            <div id="footer">
              <FooterNav />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = ({ auth, login }) => ({ auth, login });

const mapDispatchToProps = dispatch => ({
  fetchUser: () => dispatch(fetchUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
