const fetch = require('node-fetch');
const express = require("express");
const { asyncHandler } = require("../utils");

const router = express.Router();


router.get(
  "/",
  asyncHandler(async (req, res, next) => {    
   
    const pokeId = Math.floor((Math.random() * 899) + 1);
    const padToThree = (number) => (number <= 999 ? `00${number}`.slice(-3) : number);
    
    try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`);
    const pokemonInfo = await response.json();

    const pokeName = pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1);
    const pokeHp = pokemonInfo.stats[0].base_stat;
    const pokeType = pokemonInfo.types[0].type.name;
    const pokeUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padToThree(pokeId)}.png`;

    const random1 = Math.floor(((Math.random() * (pokemonInfo.moves.length - 1)) + 1))
    const random2 = Math.floor(((Math.random() * (pokemonInfo.moves.length - 1)) + 1))

    const randomMove1 = pokemonInfo.moves[random1].move.name;
    const randomMove2 = pokemonInfo.moves[random2].move.name;

    const pokemon = {
        name: pokeName,
        id: pokeId,
        hp: pokeHp,  
        type: pokeType,
        imageUrl: pokeUrl,
        move1: randomMove1,
        move2: randomMove2,
    };

    res.status(201).json( { pokemon });

    } catch (e) {
        console.log(e);
    };
}));

module.exports = router;
