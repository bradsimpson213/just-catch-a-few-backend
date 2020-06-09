const fetch = require('node-fetch');

const getRandomPokemonInfo = async () => {
   
    const pokeId = Math.floor((Math.random() * 899) + 1);
    const padToThree = (number) => (number <= 999 ? `00${pokeId}`.slice(-3) : number);
    
    try{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokeId}/`);
    const pokemonInfo = await response.json();

    const pokeName = pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1);
    const pokeHp = pokemonInfo.stats[0].base_stat;
    const pokeType = pokemonInfo.types[0].type.name;
    const pokeUrl = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${padToThree(pokeId)}.png`;

    const pokemon = {
        name: pokeName,
        hp: pokeHp,  
        type: pokeType,
        imageUrl: pokeUrl,
        move1: "",
        move2: "",
    };

   console.log(pokemon);

    } catch (e) {
        console.log(e);
    };
};

console.log(getRandomPokemonInfo());
