import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import {connect} from 'react-redux'
import * as actions from '../../actions'
import {Button} from 'antd'
class Payments extends Component {
  render() {
    return (
      <div>
        <StripeCheckout
          name="Hamro Paathsala"
          description="$20 for 20 Credits"
          amount = {2000}
          token= {token => this.props.handleToken(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
        >
          <Button ghost>Add Credits</Button>
        </StripeCheckout>
      </div>
    )
  }
}

export default connect(null, actions)(Payments)
