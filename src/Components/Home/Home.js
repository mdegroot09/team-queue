import React, {Component} from 'react'
var zipcodes = require('zipcodes');

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      zip: '',
      dist: 15,
      agents:[
        {name: 'Wyatt Koeven', city: 'Salt Lake City', zip: 84101},
        {name: 'JoAnn Ortega-Petty', city: 'Taylorsville', zip: 84119},
        {name: 'Eric Nelson', city: 'Cedar Hills', zip: 84604},
        {name: 'Jeremy Doggett', city: 'Sandy', zip: 84092},
        {name: 'Jake Richins', city: 'Draper', zip: 84020},
        {name: 'Juan Gomez', city: 'Saratoga Springs', zip: 84045},
        {name: 'Kodi Paulson', city: 'Eagle Mountain', zip: 84005}
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
          <div key={i} className='agentLine'>
            <div className='agentName'>{agent.name}</div>
            <div className='agentCity'>{agent.city}</div>
            <div className='agentDist'>{dist ? dist + ' miles' : ''}</div>
          </div>
        )
      } else return
    })
    
    return(
      <div>
        <h1>Black Ops Queue</h1>
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
        <div className='agentTable'>
          <div className='agentLine'>
            <div className='agentName' style={{fontWeight: '700'}}>Name</div>
            <div className='agentCity' style={{fontWeight: '700'}}>City</div>
            <div className='agentDist' style={{fontWeight: '700'}}>Distance</div>
          </div>
          {list}
        </div>
      </div>
    )
  }
}