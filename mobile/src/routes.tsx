import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Cadastro from './pages/Cadastro'

const AppStack = createStackNavigator();

const routes = () => {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode='none'
                screenOptions= {{
                    cardStyle: {
                        backgroundColor: '#F0F0F0'
                    }
                }}
            >
                <AppStack.Screen name='Home' component={Home} />
                <AppStack.Screen name='Cadastro' component={Cadastro} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default routes;