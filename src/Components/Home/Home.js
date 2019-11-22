import React, {Component} from 'react'
var zipcodes = require('zipcodes');

export default class Home extends Component {
  constructor(){
    super()
    this.state = {
      zip: '',
      dist: '',
      agents:[
        {name: 'Wyatt', zip: 84101},
        {name: 'JoAnn', zip: 84119},
        {name: 'Eric', zip: 84604}
      ]
    }
  }

  handleInput(val){
    this.setState({zip: val})
  }

  // calcDist(){
  //   var zip = this.state.zip
  //   var wyatt = 84004
  //   var dist = zipcodes.distance(wyatt, zip)
  //   this.setState({dist: dist})
  // }

  render(){
    let {agents} = this.state
    let list = agents.map((agent, i) => {
      let dist = zipcodes.distance(agent.zip, this.state.zip)
      if (dist <= 15){
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
        <input onChange={(e)=>this.handleInput(e.target.value)} type="number"/>
        <button onClick={()=>this.calcDist()}>Get Distance</button>
        {list}
      </div>
    )
  }
}