import React from 'react'
import { Text, View, StyleSheet, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

const Home = () => {

    const navigation = useNavigation()

    function handleNavigationToCadastro() {
        navigation.navigate('Cadastro');
    }

    return (
        <>
            <KeyboardAvoidingView
                style={{flex:1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                
                <View style={styles.main}>
                    <Text style={styles.appTitle}>Nome do aplicativo</Text>
                    <Text style={styles.bordao}>Resumo/Bordão</Text>
                    <Text style={styles.resumo} >Saiba as necessidades e os acontecimentos dos canteiros de obras em tempo real</Text>

                    
                </View>
            
                <View style={styles.container}>
                    <TextInput placeholder='E-Mail' autoCompleteType='email' style={styles.input} />
                    <TextInput placeholder='Senha' autoCompleteType='password' style={styles.input} />
                    
                    <Button title='Entrar' titleStyle={styles.buttonText} buttonStyle={styles.button} />
                    <Text style={styles.criarConta} onPress={handleNavigationToCadastro}>Criar conta</Text>
                </View>
            </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        padding: 30,
        backgroundColor: '#F0F0F0'
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
        marginTop: 50
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20BF6B',
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        height: 350,
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