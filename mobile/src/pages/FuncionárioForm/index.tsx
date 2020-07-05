import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Text, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'

import api from '../../services/api';

let empresas = [{}]

interface EmpresaPicker {
    label: string,
    value: string
}

interface Users {
    tipo: string,
    nome: string,
    sobrenome: string,
    email: string,
    empresa: string,
    senha: string
}

const FuncionarioForm = () => {
    const [todasEmpresas, setTodasEmpresas] = useState<string[]>([]);

    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation()

    useEffect(() => {
        api.get<Users[]>('users').then(response => {

            const filter = response.data.map(data => data.tipo === 'Empresa' ? data.empresa : '')
            const filtered = filter.filter((el) => {
                return el != ''
            })

            setTodasEmpresas(filtered);
        })
    }, [])

    function handleSubmit() {
        if(nome === '' || sobrenome === '' || email === '' || empresa === 'empresaNaoSelecionada' || senha === ''){
            return Alert.alert(
                'Dados incompletos',
                'Verifique se todos os campos estão preenchidos',
                [{text: 'OK'}]
            );
        } else {
            handlePost()
        }
    }

    async function handlePost() {
        const data = {
            tipo: 'Funcionario',
            nome,
            sobrenome,
            email,
            empresa,
            senha
        }

        await api.post('users', data, {headers: { 'Content-Type': 'application/json'}})

        Alert.alert(
            'Usuário criado',
            'Usuário criado com sucesso',
            [{text: 'Continuar', onPress: () => navigation.navigate('MainPageFuncionario', data)}]
        )
    }

    function handleNavigateBack() {
        navigation.goBack();
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.main}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' size={20} color='#20BF6B' />
                </TouchableOpacity>

                <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                    <View style={styles.form}>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>Nome:</Text>
                            <TextInput style={styles.input} onChangeText={text => setNome(text)} keyboardAppearance='dark' />
                        </View>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>Sobrenome:</Text>
                            <TextInput style={styles.input} onChangeText={text => setSobrenome(text)} keyboardAppearance='dark' />
                        </View>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>E-Mail:</Text>
                            <TextInput style={styles.input} 
                                onChangeText={text => setEmail(text)}
                                autoCompleteType='email'
                                autoCapitalize='none'
                                keyboardAppearance='dark'
                                keyboardType='email-address'
                            />
                        </View>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>Nome da empresa:</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Selecione sua empresa', value: 'empresaNaoSelecionada' }}
                                onValueChange={(value) => {
                                    setEmpresa(value)
                                }}
                                items={todasEmpresas.map(empresa => {return { label: empresa, value: empresa } })}
                                style={pickerStyle}
                                Icon={() => {
                                    return (
                                        <Icon name='chevron-down' color='#20BF6B' size={24} style={{ paddingHorizontal: 16, paddingVertical: 16 }} />
                                    )
                                }}
                            />
                        </View>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>Senha:</Text>
                            <TextInput style={styles.input} 
                                onChangeText={text => setSenha(text)} 
                                keyboardAppearance='dark'
                                autoCapitalize='none'
                                secureTextEntry={true}
                            />
                        </View>

                    </View>
                </KeyboardAvoidingView>
                <View style={styles.buttonPosition}>
                    <Button title='Entrar' titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={handleSubmit} />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default FuncionarioForm;

const pickerStyle = {
    inputIOS: {
        width: 320,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 5
    },
    inputAndroid: {
        width: 320,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 5
    },
    placeholderColor: 'white',
    underline: { borderTopWidth: 0 },
    icon: {
        position: 'absolute',
        backgroundColor: 'transparent',
        borderTopWidth: 5,
        borderTopColor: '#00000099',
        borderRightWidth: 5,
        borderRightColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftColor: 'transparent',
        width: 10,
        height: 10,
        top: 20,
        right: 15,
    },
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 27,
        paddingTop: 20
    },
    form: {
        flex: 1,
        marginTop: 15,
        justifyContent:'center',
        alignItems: 'center'
    },
    input: {
        width: 320,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 5,
    },
    inputName: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        paddingLeft: 15,
        fontWeight: 'bold'
    },
    separator: {
        flex: 1,
    },
    buttonText: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: '#20BF6B',
        borderRadius: 35,
        height: 45
    },
    buttonPosition: {
        justifyContent: 'flex-end',
        marginBottom: 20
    }
})