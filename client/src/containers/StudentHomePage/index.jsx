import React, { Component } from 'react'
import {Wrapper, ContentDiv, Title} from '../../components/Wrapper'
import {List} from 'antd';

import './style.css'


import CourseCard from '../../components/CourseCard'

const data = [
  {
    title:'React JS Complete Course',
    teacherName:'Swikar Bhattarai',
    price:30,
    status:'locked',
    addedDate:'2018/01/01',
    videosCount:30,
    totalDuration:24,
    level:'All Level',
    description:'Learn modern react js and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
  {
    title:'Node JS Complete Course',
    teacherName:'Bipin Neupane',
    price:2,
    status:'unlocked',
    addedDate:'2019/01/01',
    videosCount:30,
    totalDuration:24,
    level:'Intermediate',
    description:'Learn modern node js and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
  {
    title:'Spring Complete Course',
    teacherName:'Amresh Thakur',
    price:5,
    status:'locked',
    addedDate:'2019/02/02',
    videosCount:30,
    totalDuration:24,
    level:'Beginner',
    description:'Learn modern spring and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
  {
    title:'Php Complete Course',
    teacherName:'Khiman Thapa',
    price:3,
    status:'unlocked',
    addedDate:'2018/01/03',
    videosCount:30,
    totalDuration:24,
    level:'Beginner',
    description:'Learn modern php and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
  {
    title:'React JS Complete Course',
    teacherName:'Swikar Bhattarai',
    price:5,
    status:'locked',
    addedDate:'2018/01/01',
    videosCount:30,
    totalDuration:24,
    level:'All Level',
    description:'Learn modern react js and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
  {
    title:'Node JS Complete Course',
    teacherName:'Bipin Neupane',
    price:8,
    status:'unlocked',
    addedDate:'2019/01/01',
    videosCount:30,
    totalDuration:24,
    level:'Intermediate',
    description:'Learn modern node js and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
  {
    title:'Spring Complete Course',
    teacherName:'Amresh Thakur',
    price:10,
    status:'locked',
    addedDate:'2019/02/02',
    videosCount:30,
    totalDuration:24,
    level:'Beginner',
    description:'Learn modern spring and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
  {
    title:'Php Complete Course',
    teacherName:'Khiman Thapa',
    price:3,
    status:'unlocked',
    addedDate:'2018/01/03',
    videosCount:30,
    totalDuration:24,
    level:'Beginner',
    description:'Learn modern php and be the best.',
    features:['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
  },
]


const unlockedCourse = data.filter((course) =>(
  course.status ==="unlocked"
))

// const recentCourse = data.filter((course) =>(
//   course.addedDate ==="unlocked"
// ))

 class StudentHomePage extends Component {
  render() {
    return (
      <Wrapper>
        <h1>Welcome User,</h1>
        <Title>Unlocked Courses!</Title>
        <ContentDiv>
          <List
             grid={{
              gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
            }}
            dataSource={unlockedCourse}
            renderItem={item => (
              <List.Item>
                <CourseCard title={item.title} teacherName={item.teacherName} price={item.price} status={item.status} />
              </List.Item>
            
            )}
            
          />
        </ContentDiv>
        <Title>Recently added courses!</Title>
        <ContentDiv>
          <List
             grid={{
              gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <CourseCard 
                title={item.title} 
                teacherName={item.teacherName} 
                price={item.price} 
                status={item.status}
                videosCount={item.videosCount}
                totalDuration={item.totalDuration}
                level={item.level}
                description={item.description}
                features= {item.features}
              />
              </List.Item>
            
            )}
            
          />
       
        </ContentDiv>
        <Title>You may also like these courses!</Title>
        <ContentDiv >
        <List
             grid={{
              gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 6, xxl: 3,
            }}
            dataSource={data}
            renderItem={item => (
              <List.Item>
                <CourseCard title={item.title} teacherName={item.teacherName} price={item.price} status={item.status} />
              </List.Item>
            
            )}
          />
        </ContentDiv>
      </Wrapper>
      
  
    )
  }
}

export default StudentHomePage
