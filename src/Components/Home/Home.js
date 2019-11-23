import React, {Component} from 'react'
var zipcodes = require('zipcodes');

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      zip: '',
      dist: 15,
      agents:[
        {name: 'Wyatt Koeven', city: 'Salt Lake City', zip: 84111, last: 1574432837000},
        {name: 'JoAnn Ortega-Petty', city: 'Taylorsville', zip: 84129, last: 1574321737000},
        {name: 'Eric Nelson', city: 'Cedar Hills', zip: 84062, last: 1574210637000},
        {name: 'Jeremy Doggett', city: 'Sandy', zip: 84092, last: 1574109537000},
        {name: 'Jake Richins', city: 'Draper', zip: 84020, last: 1573876237000},
        {name: 'Juan Gomez', city: 'Saratoga Springs', zip: 84045, last: 1573987337000},
        {name: 'Kodi Paulson', city: 'Eagle Mountain', zip: 84005, last: 1574098437000}
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
    let agentsList = agents.sort((a, b) => (a.last > b.last) ? 1 : -1)
    let agentsFilter = agentsList.filter(agent => {
      let dist = zipcodes.distance(agent.zip, this.state.zip)
      if (dist <= this.state.dist){
        return agent
      } else return false
    })
    let list = agentsFilter.map((agent, i) => {
      let dist = zipcodes.distance(agent.zip, this.state.zip)
      // if (dist <= this.state.dist){
        return (
          <div key={i} className='agentLine' style={{backgroundColor: i === 0 ? 'rgba(88, 219, 194, .2)' : 'white'}}>
            <div className='agentName'>{agent.name}</div>
            <div className='agentCity'>{agent.city}</div>
            <div className='agentDist'>{this.state.zip ? dist + ' miles' : ''}</div>
            <div className='agentLast'>{`${new Date(+agent.last).toLocaleDateString('en-US')} ${new Date(+agent.last).toLocaleTimeString('en-US')}`}</div>
          </div>
        )
      // } else return
    })
    
    return(
      <div>
        <h1>Black Ops Queue</h1>
        <div className='milesDist'>
          <button 
            className='button'
            // onKeyDown={this.updateDistFast(this.state.dist, 'down')} 
            // onKeyUp={this.cancelDistFast(this.state.dist, 'down')}
            onClick={()=>this.updateDist(this.state.dist - 1)}>
            -
          </button>
          <p style={{margin: '0 10px'}}>{this.state.dist} miles</p>
          <button 
            className='button'
            // onKeyDown={this.updateDistFast(this.state.dist, 'up')} 
            // onKeyUp={this.cancelDistFast(this.state.dist, 'up')}
            onClick={()=>this.updateDist(this.state.dist + 1)}>
            +
          </button>
        </div>
        <input onChange={(e)=>this.handleInput('zip', e.target.value)} type="number" placeholder='zip code'/>
        {/* <button onClick={()=>this.calcDist()}>Get Distance</button> */}
        <div className='agentTable'>
          <div className='agentLine'>
            <div className='agentName' style={{fontWeight: '700'}}>Name</div>
            <div className='agentCity' style={{fontWeight: '700'}}>City</div>
            <div className='agentDist' style={{fontWeight: '700'}}>Distance</div>
            <div className='agentLast' style={{fontWeight: '700'}}>Last Lead Received</div>
          </div>
          {list}
        </div>
      </div>
    )
  }
}