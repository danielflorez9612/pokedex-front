import React, {useEffect, useState} from 'react';
import {Box, Button, Card, CardBody, CardHeader, Grid, Grommet, Heading, Image, Stack, Text, TextInput} from 'grommet';
import PokemonService from "../services/PokemonService";
import {FormNextLink, FormPreviousLink, Search} from "grommet-icons";

const theme = {
    global: {
        hover: {
            background: {
                opacity: 'strong'
            }
        },
        font: {
            family: `-apple-system,
         BlinkMacSystemFont, 
         "Segoe UI"`,
        },
        colors: {
            blue: '#00C8FF',
            green: '#17EBA0',
            teal: '#82FFF2',
            purple: '#F740FF',
            red: '#FC6161',
            orange: '#FFBC44',
            yellow: '#FFEB59',
        },
    },
    card: {
        footer: {
            pad: {horizontal: 'medium', vertical: 'small'},
            background: '#FFFFFF27',
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
        limit:20
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
        updateList(state.currentOffset+state.limit, state.limit)
    };
    const prevPage = () => {
        updateList(state.currentOffset-state.limit, state.limit)
    };

    useEffect(()=>updateList(state.currentOffset,state.limit), [])
    return <Grommet theme={theme} full>
        <Box pad="medium">
            <Box align="center" pad="large" gap='small'>
                <Box direction="row" gap='medium'>
                    <Button icon={<FormPreviousLink />} onClick={()=>prevPage()} disabled={state.currentOffset===0} primary/>
                    <Button icon={<FormNextLink />} onClick={()=>nextPage()} disabled={state.pokemonList.length<state.limit} primary />
                </Box>
                <Box width="medium" direction="row" gap="medium">
                    <TextInput icon={<Search />} onChange={event => updateList(event.target.value?event.target.value:0)} placeholder="offset" />
                </Box>
            </Box>
            {/* Responsive Grid */}
            <Grid gap="medium" rows="small" columns='small'>
                {state.pokemonList.map(value => (
                    <Card
                        onClick={() => {
                            pokemonService.getPokemonByName(value.name)
                                .then(pokemon => setState({...state, pokemonDetail: pokemon}))
                        }}
                        hoverIndicator={true}
                        key={value.id}
                        background={pokemonService.getTypeColor(value.type)}
                    >
                        <Stack anchor="bottom-left"
                        >
                            <CardBody pad={{horizontal: 'small', bottom: 'large', top: 'none'}} height='small'>
                                <b>{value.id}</b>
                                <Image
                                    fit="contain"
                                    a11yTitle="scuba diving"
                                    src={value.image?value.image:'https://elvortex.com/wp-content/uploads/2018/03/HddtBOT-1068x601.png'}
                                />
                            </CardBody>
                            <CardHeader
                                pad={{horizontal: 'small', vertical: 'small'}}
                                background={`${pokemonService.getTypeColor(value.type)}80`}
                                width="medium"
                                justify="start"
                            >
                                <Box>
                                    <Heading level='3' margin='none'>
                                        {capitalize(value.name)}
                                    </Heading>
                                    <Text size="xsmall"><b>Weight: </b>{value.weight}</Text>
                                    <Text size="xsmall"><b>Type: </b>{value.type}</Text>
                                    <Text size="xsmall" wordBreak={"break-all"}><b>Abilities: </b>{value.abilities.join(', ')}</Text>
                                </Box>
                            </CardHeader>
                        </Stack>
                    </Card>
                ))}
            </Grid>
        </Box>
    </Grommet>
}

export default PokemonDashboard;