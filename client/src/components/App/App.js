import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../../actions";
import FooterNav from "../Footer";
import Header from "../Header";
import Landing from "../LandingPage";
import StudentHomePage from "../StudentHomePage";
import StudentCourseVideoPage from "../StudentCourseVideoPage";

import AdminHomePage from "../AdminHomePage";
import TeacherHomePage from "../TeacherHomePage";
import { Layout } from "antd";

import "./app.css";
import { Affix } from "antd";
import AddCourse from "../AddCourse";
import AddTeacher from "../AddTeacher";
import EditCourse from "../EditCourse";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  renderRoute() {
    if (this.props.auth) {
      if (this.props.auth.isAdmin) {
        return [
          <Route exact path="/home" component={AdminHomePage} />,
          <Route exact path="/add-course" component={AddCourse} />,
          <Route exact path="/add-teacher" component={AddTeacher} />,
          <Route exact path="/:id/edit" component={EditCourse} />
        ];
      } else if (this.props.auth.isTeacher) {
        return [<Route exact path="/home" component={TeacherHomePage} />];
      } else {
        return [
          <Route exact key="home" path="/home" component={StudentHomePage} />,
          <Route
            exact
            key="video"
            path="/course/:courseId"
            component={StudentCourseVideoPage}
          />
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
    const { Content } = Layout;

    return (
      <div className="app">
        <BrowserRouter>
          <Layout>
            <Header />
            <Content>{this.renderRoute()}</Content>
            <FooterNav />
          </Layout>
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
