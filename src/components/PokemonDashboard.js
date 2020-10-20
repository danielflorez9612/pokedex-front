import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardBody, CardHeader, Grid, Grommet, Heading, Image, Layer, Stack, Text} from 'grommet';
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
    layer: {
        background: 'none'
    },
};

const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const pad = (n, width, z) => {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}
const pokemonService = PokemonService();
const PokemonDashboard = () => {
    const whoIsThatPokemonImage = 'https://elvortex.com/wp-content/uploads/2018/03/HddtBOT-1068x601.png';
    const [state, setState] = useState({
        pokemonList: [],
        currentOffset: 0,
        pokemonDetail: null,
        limit: 100
    });
    const [pokemonDetailOpen, setPokemonDetailOpen] = useState(false);
    const closeDetail = () => setPokemonDetailOpen(false);

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
        return <Card
            onClick={() => {
                pokemonService.getPokemonByName(pokemon.name)
                    .then(pokemon => setState({...state, pokemonDetail: pokemon}))
                    .then(() => setPokemonDetailOpen(true))
            }}
            hoverIndicator={true}
            key={pokemon.id}
            pad={{bottom:'xlarge'}}
            background={`linear-gradient(102.77deg, ${pokemonService.getTypeColor(pokemon.type)} -9.18%, #FFF 250.09%)`}
        >
            <Stack anchor="bottom-left">
                <CardBody pad={{horizontal: 'small', bottom: 'large', top: 'none'}} height='small'>
                    <Text margin={{top:"small"}} weight='bold' size='large'>{pokemon.id}</Text>
                    <Box animation='fadeIn'>
                        <Image
                            fit="contain"
                            a11yTitle="Official Artwork"
                            src={pokemon.image ? pokemon.image : whoIsThatPokemonImage}
                        />
                    </Box>
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

    const PokemonDetailLayer = ({pokemonDetail, open}) => {
        const buttonTheme = (backgroundActive) => {
            return {
                global: {
                    active: {
                        background: {
                            color: backgroundActive,
                            opacity: 'strong'
                        },
                    }
                },
                button:{
                    border:{
                        color:'white'
                    }
                }
            }
        }
        return open && pokemonDetail && <Layer position="center" onClickOutside={closeDetail} onEsc={closeDetail} >
            <Box
                pad={{bottom:'none', horizontal:'none', top:'large'}}
                gap="small"
                round={true}
                width="large"
                height='large'
                background={`linear-gradient(102.77deg, ${pokemonService.getTypeColor(pokemonDetail.type)} -9.18%, #FFF 250.09%)`}
            >
                <Heading level='1' margin={{horizontal:'large', vertical:'none'}} color='white'>
                    {capitalize(pokemonDetail.name)} #{pad(pokemonDetail.id, 4)}
                </Heading>
                <Box direction='row' margin={{horizontal:'large', vertical:'none'}} gap='small'>
                    {pokemonDetail.type.split('/').map(type=>
                        <Grommet theme={buttonTheme(pokemonService.getTypeColor(type))}>
                            <Button
                                primary
                                active
                                label={capitalize(type)}
                            />
                        </Grommet>
                    )}
                </Box>
                <Image
                    fit="contain"
                    a11yTitle="Official Artwork"
                    src={pokemonDetail.image ? pokemonDetail.image : whoIsThatPokemonImage}
                />
                <Box
                    as="footer"
                    gap="small"
                    direction="column"
                    align="start"
                    justify="end"
                    background='white'
                    pad='large'
                    round={true}
                >
                    <Text size='large'>{pokemonDetail.description}</Text>
                    <Text size="medium"><b>Weight: </b>{pokemonDetail.weight}</Text>
                    <Text size="medium"
                          wordBreak={"break-all"}><b>Abilities: </b>{pokemonDetail.abilities.map(capitalize).join(', ')}
                    </Text>
                    {pokemonDetail.evolutions.length>0 &&
                    <Text size="medium"
                          wordBreak={"break-all"}><b>Evolves to: </b>{pokemonDetail.evolutions.map(capitalize).join(', ')}
                    </Text>
                    }

                </Box>
            </Box>
        </Layer>
    }
    useEffect(() => updateList(state.currentOffset, state.limit), [])
    return <Grommet theme={theme} full>
        <Box pad={{horizontal: 'medium', vertical: 'small'}}>
            <GridControls/>
            {/* Responsive Grid */}
            <Grid gap="medium" rows="small" columns='small'>
                {state.pokemonList.map(value => (<PokemonGridItem key={value.id} pokemon={value}/>))}
            </Grid>
            <GridControls/>
        </Box>
        <PokemonDetailLayer open={pokemonDetailOpen} pokemonDetail={state.pokemonDetail}/>
    </Grommet>
}

export default PokemonDashboard;