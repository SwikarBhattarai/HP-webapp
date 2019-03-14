import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import { Card, Icon, Avatar, Modal, Button,  Spin } from 'antd'
import { deductCredit } from '../../actions';
import {connect} from 'react-redux'
import './style.css'

class CourseCard extends Component {

  state={visible:false, amount:0}

  showModal = (e) =>{
    if(this.props.status ==="unlocked"){
      this.setState({
        visible:false
      })

      console.log('History', this.props.history)

      let path="/course-name"
      this.props.history.push(path)
    }else{
      this.setState({
        visible:true
      })
    }
  }

  handleUnlock=(e)=>{
    const amount = this.props.auth.credits
    const diffAmount = amount- this.props.price
    this.props.deductCredit(diffAmount)
    this.setState({
      amount:this.props.auth.credits- this.props.price,
      visible:false,
    })
    // eslint-disable-next-line no-unused-expressions
    this.props.deductCredit ?
    window.location.reload()
    :
    <div className='example'>
      <Spin />
    
    </div>
    
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  render() {
    const { Meta } = Card;
    return (
      <div>
        <Card
          onClick={this.showModal}
          hoverable
          cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
          actions={this.props.status ==="locked" ? [<h2><Icon type="lock" /> LOCKED</h2>, <h2>{this.props.price} Credits</h2>] : [<h2><Icon type="unlock" /> UNLOCKED</h2>]}
        >
          <Meta
            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
            title={this.props.title}
            description={this.props.teacherName}
          />
        </Card>
        <Modal
          title={[
          <h2>{this.props.title}</h2>,
          <div style={{display:'flex', justifyContent:'space-around'}}>
            <p><Icon type="play-circle" /> {this.props.videosCount} videos</p>
            <p><Icon type="clock-circle" /> {this.props.totalDuration} hours</p>
            <p><Icon type="read" /> {this.props.level}</p>
            
          </div>
          
        ]}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={[
            <Button style={{display:'flex', margin:'auto'}}size="large" key="submit" type="primary" onClick={this.handleUnlock}>
              UNLOCK THIS COURSE FOR&nbsp;{this.props.price}&nbsp;CREDITS
            </Button>,
          ]}
        >
          <h3>{this.props.description}</h3>
          <h4>Features:</h4>
          <ul>
            {this.props.features && 
                this.props.features.map((feature)=>(
                  <li key={feature}>{feature}</li>
                ))
          } 
          
          </ul>
        </Modal>
      </div>
      
      
    )
  }
}

function mapStateToProps({ auth }){
  return { auth };
}

const mapDispatchToProps = dispatch =>({
  deductCredit: (amount) => dispatch(deductCredit(amount))
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CourseCard))
