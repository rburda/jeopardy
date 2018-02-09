import React from 'react'
import '../css/playerlist.css'

export default class ScoreBoard extends React.Component {
  
  render() {
    const {players} = this.props;
    return (
      <div id="playerList">
        <ul>{players.map((p, _) => {return <li>{p.name} : {p.score}</li>})}</ul>
      </div>
    );
  }
}