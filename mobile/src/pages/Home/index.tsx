import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform, Alert, ImageBackground, Dimensions } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import api from '../../services/api'

interface Users {
    id: number,
    tipo: string,
    nome: string,
    sobrenome: string,
    email: string,
    empresa: string,
    senha: string
}

const Home = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation()

    function handleNavigationToCadastro() {
        navigation.navigate('Cadastro');
    }

    function handleLogIn() {
        let length = users.length
        users.map(user => {
            if(email === user.email && senha === user.senha){
                if(user.tipo === 'Empresa'){
                    return navigation.navigate('MainPageEmpresa', user)
                } else {
                    return navigation.navigate('MainPageFuncionario', user)
                }
            } else if (length <= 1) {
                return Alert.alert(
                    'Usuário não encontrado',
                    'Verifique se o E-Mail ou senha estão corretos',
                    [{ text: 'OK' }]
                )
            }
            --length
        })
    }

    useEffect(() => {
        api.get('users').then(response => {
            setUsers(response.data);
        });
    }, []);

    return (
        <KeyboardAvoidingView
                style={{flex:1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                
                <View style={styles.main}>
                    <ImageBackground
                        source={require('../../assets/cityscapes.png')}
                        style={{position: 'absolute', bottom: Dimensions.get('screen').height / 3, opacity: 0.6}}
                        imageStyle={{width: Dimensions.get('window').width, height: Dimensions.get('window').height / 2.5}}
                    />

                    <Text style={styles.appTitle}>Obra sem Covid</Text>
                    <Text style={styles.resumo} >Saiba as necessidades e os acontecimentos dos canteiros de obras em tempo real</Text>
                </View>
            
                <View style={styles.container}>
                    <TextInput 
                        placeholder='E-Mail' 
                        autoCompleteType='email' 
                        style={styles.input} 
                        onChangeText={text => setEmail(text)} 
                        autoCapitalize='none' 
                        keyboardAppearance='dark'
                        keyboardType='email-address'
                    />
                    <TextInput 
                        placeholder='Senha' 
                        autoCompleteType='password' 
                        style={styles.input} 
                        onChangeText={text => setSenha(text)} 
                        autoCapitalize='none'
                        keyboardAppearance='dark'
                        secureTextEntry={true}
                    />
                    
                    <Button title='Entrar' titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={handleLogIn} />
                    <TouchableOpacity onPress={handleNavigationToCadastro}>
                        <Text style={styles.criarConta} >Criar conta</Text>
                    </TouchableOpacity>

                </View>
            </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
        padding: 30
    },
    appTitle: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 38    
    },
    bordao: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 28,
        marginTop: 20
    },
    resumo: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 18,
        marginTop: 20
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20BF6B',
        height: Dimensions.get('screen').height / 2,
        shadowOpacity: 0.2
    },
    input: {
        width: 300,
        height: 60,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 20
    },
    button: {
        backgroundColor: '#fff',
        width: 300,
        height: 65,
        borderRadius: 35,
        marginTop: 40
    },
    buttonText: {
        color: '#20BF6B',
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold'
    },
    criarConta: {
        fontSize: 18,
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 15
    }
})

export default Home;