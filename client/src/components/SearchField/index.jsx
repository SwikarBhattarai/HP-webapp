import React, { Component } from 'react'
import {Input} from 'antd'

class SearchField extends Component {


  render() {
    const Search = Input.Search
    return (
      <Search
      placeholder="Search for courses.."
      onSearch={value =>this.props.search(value)}
      style={{ width: 200 }}
    />
    )
  }
}

export default SearchField
