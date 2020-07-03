import React, { useState, useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Feather as Icon } from '@expo/vector-icons'
import { SafeAreaView, View, TouchableOpacity, StyleSheet, Text } from 'react-native'
import { Button } from 'react-native-elements'

const PROP = [
    {
        key: 'teste',
        Text: 'teste'
    },
    {
        key: 'teste2',
        Text: 'teste2'
    }
]

const Cadastro = () => {
    const navigation = useNavigation();

    const [type, setType] = useState('first');

    function handleFuncionárioPress() {
        navigation.navigate('FuncionarioForm');
    }

    function handleEmpresaPress() {
        navigation.navigate('EmpresaForm');
    }
    
    function handleNavigateBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.main}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' size ={20} color='#20BF6B' />
                </TouchableOpacity>
                
                <View style={styles.container}>
                    <Text style={styles.label}>Você é...</Text>
                    <Button title='Funcionário' onPress={handleFuncionárioPress} buttonStyle={styles.upButton} TouchableComponent={TouchableOpacity} ></Button>
                    <Button title='Empresa' onPress={handleEmpresaPress} buttonStyle={styles.downButton}></Button>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex:1,
        paddingHorizontal: 27,
        paddingTop: 20
    },
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    label: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 18
    },
    upButton: {
        backgroundColor: '#20BF6B',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        height: 60,
        marginTop: 30
    },
    downButton: {
        backgroundColor: '#20BF6B',
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        height: 60,
        marginTop: 1
    }
})

export default Cadastro;