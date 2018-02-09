import React, { Component } from 'react';
import CategoryList from './CategoryList';
import ScoreBoard from './ScoreBoard';
import '../css/gameboard.css';
//import PropTypes from 'prop-types'

export default class GameBoard extends React.Component {

  render() {
    const {categories, visible, onSelectQuestion, players} = this.props;
    return (
      <div>
        <ScoreBoard players={players}/>      
        <div id="gameboardWrapper">
          <div id="gameboard" className={visible ? "gameboard_visible" : "gameboard_hidden"}>
            <CategoryList categories={categories} onSelectQuestion={onSelectQuestion}/>
          </div>
        </div>
      </div>
    );
  }
};
/*
GameBoard.propTypes = 
  PropTypes.shape({
    categories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        questions: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            text: PropTypes.string.isRequired,
            value: PropTypes.number.isRequired,
            isDailyDouble: PropTypes.bool.isRequired,
            used: PropTypes.bool.isRequired
          }))
      })
    ),
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        score: PropTypes.number.isRequired
      })
    ).isRequired,
    gameState: PropTypes.shape({
      status: PropTypes.string.isRequired,
      view: PropTypes.string.isRequired
    }).isRequired
  })
*/