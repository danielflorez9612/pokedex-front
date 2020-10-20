import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardBody, CardHeader, Grid, Grommet, Heading, Image, Stack, Text} from 'grommet';
import PokemonService from "../services/PokemonService";
import {FormNextLink, FormPreviousLink} from "grommet-icons";

const theme = {
    global: {
        hover: {
            background: {
                opacity: 'strong'
            }
        },
    },
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const pokemonService = PokemonService();
const PokemonDashboard = () => {
    const [state, setState] = useState({
        pokemonList: [],
        currentOffset: 0,
        pokemonDetail: null,
        limit: 100
    });
    const updateList = (offset, limit) => {
        pokemonService.getPokemonList(offset, limit)
            .then(list => {
                setState({
                    ...state,
                    pokemonList: list,
                    currentOffset: offset
                })
            })
    };
    const nextPage = () => {
        updateList(state.currentOffset + state.limit, state.limit)
    };
    const prevPage = () => {
        updateList(state.currentOffset - state.limit, state.limit)
    };

    const PokemonGridItem = ({pokemon}) => {
        const whoIsThatPokemonImage = 'https://elvortex.com/wp-content/uploads/2018/03/HddtBOT-1068x601.png';
        return <Card
            onClick={() => {
                pokemonService.getPokemonByName(pokemon.name)
                    .then(pokemon => setState({...state, pokemonDetail: pokemon}))
            }}
            hoverIndicator={true}
            key={pokemon.id}
            background={pokemonService.getTypeColor(pokemon.type)}
        >
            <Stack anchor="bottom-left">
                <CardBody pad={{horizontal: 'small', bottom: 'large', top: 'none'}} height='small'>
                    <b>{pokemon.id}</b>
                    <Image
                        fit="contain"
                        a11yTitle="Official Artwork"
                        src={pokemon.image ? pokemon.image : whoIsThatPokemonImage}
                    />
                </CardBody>
                <CardHeader
                    pad={{horizontal: 'small', vertical: 'small'}}
                    background={`${pokemonService.getTypeColor(pokemon.type)}80`}
                    width="medium"
                    justify="start"
                >
                    <Box>
                        <Heading level='3' margin='none'>
                            {capitalize(pokemon.name)}
                        </Heading>
                        <Text size="xsmall"><b>Weight: </b>{pokemon.weight}</Text>
                        <Text size="xsmall"><b>Type: </b>{pokemon.type}</Text>
                        <Text size="xsmall"
                              wordBreak={"break-all"}><b>Abilities: </b>{pokemon.abilities.join(', ')}</Text>
                    </Box>
                </CardHeader>
            </Stack>
        </Card>
    }

    const GridControls = () => {
        return <Box align="center" pad={{vertical: 'small'}} gap='small'>
            <Box direction="row" gap='medium' pad={{vertical: 'small'}}>
                <Button icon={<FormPreviousLink/>} onClick={() => prevPage()} disabled={state.currentOffset === 0}
                        primary/>
                <Button icon={<FormNextLink/>} onClick={() => nextPage()}
                        disabled={state.pokemonList.length < state.limit} primary/>
            </Box>

        </Box>
    }
    useEffect(() => updateList(state.currentOffset, state.limit), [])
    return <Grommet theme={theme} full>
        <Box pad={{horizontal: 'medium', vertical: 'small'}}>
            <GridControls />
            {/* Responsive Grid */}
            <Grid gap="medium" rows="small" columns='small'>
                {state.pokemonList.map(value => (<PokemonGridItem pokemon={value}/>))}
            </Grid>
            <GridControls/>
        </Box>
    </Grommet>
}

export default PokemonDashboard;