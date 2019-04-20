import React, { Component } from "react";
import CourseCard from "../CourseCard";
import { connect } from "react-redux";
import { Wrapper, ContentDiv, Title } from "../Wrapper";
import { Spin, List } from "antd";
import { clearData } from "../../actions";

class SearchPage extends Component {
  componentDidUpdate() {
    if (this.props.course) {
      this.props.clearData();
    }
  }
  render() {
    console.log("value", this.props.course);
    const { value, loading } = this.props.course;
    return (
      <div>
        {typeof value !== "object" ? (
          <div>
            {!loading ? (
              <Wrapper>
                <ContentDiv>
                  {value ? (
                    <div style={{ height: 400, width: 300 }}>
                      <Title style={{ marginBottom: 15 }}>
                        Searched Courses!
                      </Title>
                      <List
                        style={{ marginTop: 12 }}
                        grid={{
                          gutter: 16,
                          xs: 1,
                          sm: 2,
                          md: 4,
                          lg: 4,
                          xl: 4,
                          xxl: 3
                        }}
                        dataSource={value}
                        renderItem={item => (
                          <List.Item>
                            <CourseCard
                              title={item.courseTitle}
                              teacherName={item.teacher}
                              price={item.coursePrice}
                              level={item.courseLevel}
                              status={item.status}
                              totalVideos={item.totalVideos}
                              totalDuration={item.totalDuration}
                              description={item.description}
                              thumbnail={item.thumbnail}
                              features={item.feature}
                              item={item}
                            />
                          </List.Item>
                        )}
                      />
                    </div>
                  ) : (
                    <Title>No Searched Course!</Title>
                  )}
                </ContentDiv>
              </Wrapper>
            ) : (
              <div style={{ textAlign: "center", marginTop: 50 }}>
                <Spin size="large" />
              </div>
            )}
          </div>
        ) : (
          <div>
            {!loading ? (
              <Wrapper>
                <ContentDiv>
                  {value ? (
                    <div style={{ height: 400, width: 300 }}>
                      <Title style={{ marginBottom: 15 }}>
                        Searched Course!
                      </Title>

                      <CourseCard
                        title={value.courseTitle}
                        teacherName={value.teacher}
                        price={value.coursePrice}
                        level={value.courseLevel}
                        status={value.status}
                        totalVideos={value.totalVideos}
                        totalDuration={value.totalDuration}
                        description={value.description}
                        thumbnail={value.thumbnail}
                        features={value.feature}
                        item={value}
                      />
                    </div>
                  ) : (
                    <Title>No Searched Course!</Title>
                  )}
                </ContentDiv>
              </Wrapper>
            ) : (
              <div style={{ textAlign: "center", marginTop: 50 }}>
                <Spin size="large" />
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ course }) => {
  return { course };
};

const mapDispatchToProps = dispatch => ({
  clearData: () => dispatch(clearData)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
