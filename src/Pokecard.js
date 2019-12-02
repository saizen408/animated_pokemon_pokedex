import React, { Component } from 'react';
import './Pokecard.css';
const pokemonGif = require('./pokemon-gif');

class Pokecard extends Component {
  render() {
    let imgSrc = pokemonGif(this.props.id);
    return (
      <div className="Pokecard">
        <h1 className="Pokecard-title">{this.props.name}</h1>
        <div className="Pokecard-image">
          <img alt={this.props.name} src={imgSrc}></img>
        </div>
        <div className="Pokecard-data">Type: {this.props.type}</div>
        <div className="Pokecard-data">EXP: {this.props.exp}</div>
      </div>
    );
  }
}

export default Pokecard;
