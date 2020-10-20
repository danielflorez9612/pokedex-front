import React, {useEffect, useState} from 'react';
import {Box, Card, CardBody, CardHeader, Grid, Grommet, Heading, Image, Stack, Text} from 'grommet';
import PokemonService from "../services/PokemonService";

const theme = {
    global: {
        hover:{
          background: {
              opacity:'strong'
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
    const [pokemonList, setPokemonList] = useState([]);
    const [pokemonDetail, setPokemonDetail] = useState([]);
    useEffect(() => {
        pokemonService.getPokemonList()
            .then(list => setPokemonList(list))
    }, pokemonList)
    return <Grommet theme={theme} full>
        <Box pad="large">
            {/* Responsive Grid */}
            <Grid gap="medium" rows="small" columns={{count: 'fit', size: 'small'}}>
                {pokemonList.map(value => (
                    <Card
                        onClick={() => {
                            pokemonService.getPokemonByName(value.name)
                                .then(pokemon=> setPokemonDetail(pokemon))
                        }}
                        hoverIndicator={true}
                        key={value.id}
                        background={pokemonService.getTypeColor(value.type)}
                    >
                        <Stack anchor="bottom-left"
                            >
                            <CardBody pad={{horizontal:'small', bottom:'large', top:'none'}} height='small'>
                                <b>{value.id}</b>
                                <Image
                                    fit="contain"
                                    a11yTitle="scuba diving"
                                    src={value.image}
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
                                    <Text size="xsmall"><b>Abilities: </b>{value.abilities.join(', ')}</Text>
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