import React from "react";

const PokemonService = () => {

    const getPokemonList = (offset = 0, limit = 12)=> {
        return fetch(`/api/pokemon?offset=${offset}&limit=${limit}`)
            .then(response => response.json())
    }

    const getPokemonByName = (name) => {
        return fetch(`/api/pokemon/${name}`)
            .then(response => response.json())
    }
    const getTypeColor = (type) => {
        let split = type.split('/')[0];
        const colors = {
            normal: '#CACAAE',
            fire: '#FB6C6C',
            fighting: '#C03028',
            water: '#76BDFE',
            flying: '#A890F0',
            grass: '#48d0b0',
            poison: '#9569A5',
            electric: '#FFD86F',
            bug: '#A8B820',
            ground: '#ECD9A4',
            psychic: '#F86390',
            rock: '#B8A038',
            ghost: '#A99AC1',
            ice: '#C1E7E7',
            dragon: '#A987FA',
            dark: '#A99A91',
            fairy: '#F4C1CD',
            steel: '#D4D4E2'
        };
        return colors[split] ? colors[split] : 'white';
    }
    return {
        getTypeColor,
        getPokemonList,
        getPokemonByName
    }
}

export default PokemonService;