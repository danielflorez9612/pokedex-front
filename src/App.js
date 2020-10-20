import React from 'react';
import {Box, Grommet, Heading, ResponsiveContext} from 'grommet';
import PokemonDashboard from "./components/PokemonDashboard";

const theme = {
    global: {
        colors: {
            brand: '#e9d9d9',
        },
        font: {
            family: 'Roboto',
            size: '18px',
            height: '20px',
        },
    },
};

const AppBar = props => (
    <Box
        tag='header'
        direction='row'
        align='center'
        justify='between'
        background='brand'
        pad={{left: 'medium', right: 'small', vertical: 'small'}}
        elevation='medium'
        style={{zIndex: '1'}}
        {...props}
    />
);

function App() {
    return (
        <Grommet theme={theme} themeMode="dark" full>
            <ResponsiveContext.Consumer>
                {size => (
                    <Box fill>
                        <AppBar>
                            <Heading level='3' margin='none'>Awesome PokeDex!</Heading>
                        </AppBar>
                        <Box direction='row' flex overflow={{horizontal: 'hidden'}} background="url(https://storage.googleapis.com/pokedexbucket/background.jpg)">
                            <Box flex align='center' justify='center'>
                                <PokemonDashboard/>
                            </Box>
                        </Box>
                    </Box>
                )}
            </ResponsiveContext.Consumer>
        </Grommet>
    );
}

export default App;
