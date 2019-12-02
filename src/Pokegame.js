import React, { Component } from 'react';
import Pokedex from './Pokedex';
const pokedexNumberToName = require('./pokedex-number-to-name');

var pokeIdArr = [];
var pokeTypeArr = [];
const randPokeId = () => Math.floor(Math.random() * 721);
const generatePokeDeckIds = () => {
  for (let i = 0; i < 8; i++) {
    pokeIdArr.push(randPokeId());
  }
};
var pokeObj = {};
const getPokemonData = async id => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    pokeObj = {
      type: data.types[0].type.name,
      base_stat: data.base_experience
    };
    console.log(pokeObj);
    // console.log(data);
    // console.log('Type: ', data.types);
    // console.log('Stats: ', data.base_experience);
  } catch (error) {
    console.log(error);
  }
};

const generatePokeDeckTypes = async arr => {
  try {
    for (let i = 0; i < arr.length; i++) {
      await getPokemonData(arr[i]);
      pokeTypeArr.push(pokeObj.type);
      console.log(pokeTypeArr);
    }
  } catch (error) {
    console.log(error);
  }
};

const deckInit = async () => {
  generatePokeDeckIds();
  await generatePokeDeckTypes(pokeIdArr);
};

deckInit();

class Pokegame extends Component {
  static defaultProps = {
    pokemon: [
      {
        id: pokeIdArr[0],
        name: pokedexNumberToName[pokeIdArr[0]],
        type: pokeTypeArr[0],
        base_experience: 62
      },
      {
        id: pokeIdArr[1],
        name: pokedexNumberToName[pokeIdArr[1]],
        type: pokeTypeArr[1],
        base_experience: 63
      },
      {
        id: pokeIdArr[2],
        name: pokedexNumberToName[pokeIdArr[2]],
        type: pokeTypeArr[2],
        base_experience: 72
      },
      {
        id: pokeIdArr[3],
        name: pokedexNumberToName[pokeIdArr[3]],
        type: pokeTypeArr[3],
        base_experience: 178
      },
      {
        id: pokeIdArr[4],
        name: pokedexNumberToName[pokeIdArr[4]],
        type: pokeTypeArr[4],
        base_experience: 112
      },
      {
        id: pokeIdArr[5],
        name: pokedexNumberToName[pokeIdArr[5]],
        type: pokeTypeArr[5],
        base_experience: 95
      },
      {
        id: pokeIdArr[6],
        name: pokedexNumberToName[pokeIdArr[6]],
        type: pokeTypeArr[6],
        base_experience: 225
      },
      {
        id: pokeIdArr[7],
        name: pokedexNumberToName[pokeIdArr[7]],
        type: pokeTypeArr[7],
        base_experience: 65
      }
    ]
  };
  render() {
    let hand1 = [];
    let hand2 = [...this.props.pokemon];
    while (hand1.length < hand2.length) {
      let randIdx = Math.floor(Math.random() * hand2.length);
      let randPokemon = hand2.splice(randIdx, 1)[0];
      hand1.push(randPokemon);
    }
    let exp1 = hand1.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);
    let exp2 = hand2.reduce((exp, pokemon) => exp + pokemon.base_experience, 0);

    return (
      <div>
        <Pokedex pokemon={hand1} exp={exp1} isWinner={exp1 > exp2} />
        <Pokedex pokemon={hand2} exp={exp2} isWinner={exp2 > exp1} />
      </div>
    );
  }
}

export default Pokegame;
