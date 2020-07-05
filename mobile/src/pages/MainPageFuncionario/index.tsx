import React from 'react'
import { View, StyleSheet, Text, ScrollView } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Card } from 'react-native-elements'

import CardList from './DicasCard/index'

interface Users {
    id: number,
    tipo: string,
    nome: string,
    sobrenome: string,
    email: string,
    empresa: string,
    senha: string
}

const MainPageFuncionario = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Users;

    function handleProblemNavigation() {
        navigation.navigate('RelatarProblemaPage');
    }

    return (
        <View style={{flex: 1}}>
            <View style={styles.main}>
                <View  style={styles.container} > 
                    <Text style={styles.bemVindo}>Bem vindo de volta!</Text>
                    <View style={styles.nameCard}>
                        <Text style={styles.name}>{routeParams.nome}</Text>
                        <Text style={styles.empresa}>{routeParams.empresa}</Text>
                    </View>
                
                </View>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <Text style={styles.title}>Dicas da Sebrae:</Text>
                <ScrollView
                    horizontal={true}
                    style={{marginTop: 20}}
                    showsHorizontalScrollIndicator={false}
                >
                    <CardList />
                </ScrollView>
                <Text style={styles.title}>Teve algum problema?</Text>
                <Button title='Relatar problema' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={handleProblemNavigation} />
            </ScrollView>

        </View>
    )
}

export default MainPageFuncionario;

const styles = StyleSheet.create({
    main: {
        height: 250
    },
    container: {
        backgroundColor: '#20BF6B',
        height: 180,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
    },
    bemVindo: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 24,
        alignSelf: 'center',
        color: '#fff',
        marginTop: 60
    },
    nameCard: {
        flex: 1,
        height: 130,
        width: 320,
        backgroundColor: '#fff',
        position: 'absolute',
        top: 120,
        borderRadius: 35,
        shadowOpacity: 0.2,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },
    name: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 46
    },
    empresa: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        marginTop: 15
    },
    title: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 30,
        marginTop: 20
    },
    buttonTitle: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16
    },
    button: {
        width: 320,
        height: 60,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        borderRadius: 35,
        backgroundColor: '#20BF6B',
    }
})