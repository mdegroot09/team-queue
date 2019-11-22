import React, {Component} from 'react'
var zipcodes = require('zipcodes');

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      zip: '',
      dist: 15,
      agents:[
        {name: 'Wyatt', zip: 84101},
        {name: 'JoAnn', zip: 84119},
        {name: 'Eric', zip: 84604}
      ]
    }
    // var interval = ''
  }

  handleInput = (field, val) => {
    this.setState({[field]: val})
  }

  updateDist = (val) => {
    if(val >= 0){
      this.setState({dist: val})
    }
  }

  // updateDistFast = (val, dir) => {
  //   if(dir === 'up'){
  //     this.interval = setInterval(this.updateDist(this.state.dist))
  //   }
  // }

  // cancelDistFast = () => {
  //   window.clearInterval(this.interval)
  // }

  render(){
    let {agents} = this.state
    let list = agents.map((agent, i) => {
      let dist = zipcodes.distance(agent.zip, this.state.zip)
      if (dist <= this.state.dist){
        return (
          <div key={i}>
            <h4>{agent.name} <br/> Distance: {dist}</h4>
          </div>
        )
      } else return
    })
    
    return(
      <div>
        <h1>Home</h1>
        <p>{this.state.dist} miles</p>
        <button 
          // onKeyDown={this.updateDistFast(this.state.dist, 'up')} 
          // onKeyUp={this.cancelDistFast(this.state.dist, 'up')}
          onClick={()=>this.updateDist(this.state.dist + 1)}>
          +
        </button>
        <button 
          // onKeyDown={this.updateDistFast(this.state.dist, 'down')} 
          // onKeyUp={this.cancelDistFast(this.state.dist, 'down')}
          onClick={()=>this.updateDist(this.state.dist - 1)}>
          -
        </button>
        <br/>
        <input onChange={(e)=>this.handleInput('zip', e.target.value)} type="number" placeholder='zip code'/>
        {/* <button onClick={()=>this.calcDist()}>Get Distance</button> */}
        {list}
      </div>
    )
  }
}