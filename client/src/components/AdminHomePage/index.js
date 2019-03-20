import React, { Component } from 'react'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import { Wrapper, Title, ContentDiv } from '../Wrapper'
import './style.css'

import ColorCard from '../ColorCard'

class AdminHomePage extends Component {
  render() {
    console.log('admin auth', this.props.auth)
    return (
      <Wrapper>
        <Title>Welcome HP Admin,</Title>
        <ContentDiv>
          <ColorCard />
        </ContentDiv>
      </Wrapper>
    )
  }
}

function mapStateTopProps( { auth } ){
  return { auth }
}

export default withRouter(connect(mapStateTopProps)(AdminHomePage));
