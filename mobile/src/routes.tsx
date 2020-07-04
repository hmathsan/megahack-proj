import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import EmpresaForm from './pages/EmpresaForm';
import FuncionarioForm from './pages/FuncionárioForm'
import MainPageFuncionario from './pages/MainPageFuncionario';
import MainPageEmpresa from './pages/MainPageEmpresa';

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
                <AppStack.Screen name='EmpresaForm' component={EmpresaForm} />
                <AppStack.Screen name='FuncionarioForm' component={FuncionarioForm} />
                <AppStack.Screen name='MainPageFuncionario' component={MainPageFuncionario} />
                <AppStack.Screen name='MainPageEmpresa' component={MainPageEmpresa} />
            </AppStack.Navigator>
        </NavigationContainer>
    )
}

export default routes;