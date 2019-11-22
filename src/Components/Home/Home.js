import React, {Component} from 'react'
var zipcodes = require('zipcodes');

export default class Home extends Component {
  componentDidMount(){
    var wyatt = 84004
    var home = 84660
    var dist = zipcodes.distance(wyatt, home)
    console.log('dist:', dist)
  }

  render(){
    return(
      <div>
        Home
      </div>
    )
  }
}