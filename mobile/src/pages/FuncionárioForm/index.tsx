import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Text, KeyboardAvoidingView, Platform } from 'react-native'
import { Button } from 'react-native-elements'
import RNPickerSelect from 'react-native-picker-select'

const empresas = [
    {
        label: 'empresa1',
        value: 'empresa1',
        key: 'empresa1'
    },
    {
        label: 'empresa2',
        value: 'empresa2',
        key: 'empresa2'
    }
]

const FuncionarioForm = () => {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [senha, setSenha] = useState('');

    const navigation = useNavigation()

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
                            <TextInput style={styles.input} onChangeText={text => setNome(text)} />
                        </View>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>Sobrenome:</Text>
                            <TextInput style={styles.input} onChangeText={text => setSobrenome(text)} />
                        </View>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>E-Mail:</Text>
                            <TextInput style={styles.input} onChangeText={text => setEmail(text)} />
                        </View>
                        <View style={styles.separator}>
                            <Text style={styles.inputName}>Nome da empresa:</Text>
                            <RNPickerSelect
                                placeholder={{ label: 'Selecione sua empresa', value: '' }}
                                onValueChange={(value) => {
                                    setEmpresa(value)
                                }}
                                items={empresas}
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
                            <TextInput style={styles.input} onChangeText={text => setSenha(text)} />
                        </View>

                    </View>
                </KeyboardAvoidingView>
                <View style={styles.buttonPosition}>
                    <Button title='Entrar' titleStyle={styles.buttonText} buttonStyle={styles.button} />
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
        marginTop: 15
    },
    input: {
        width: 320,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 5
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