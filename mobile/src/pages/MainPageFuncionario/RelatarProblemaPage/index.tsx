import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { Button } from 'react-native-elements'

import RNPickerSelect from 'react-native-picker-select'


const Problemas = [
    {
        label: 'Uso inadequado de EPI',
        value: 'Uso inadequado de EPI'
    },
    {
        label: 'Higienização inadequada das ferramentas de trabalho',
        value: 'Higienização inadequada das ferramentas de trabalho'
    },
    {
        label: 'Não houve a triagem diária adequada',
        value: 'Não houve a triagem diária adequada'
    },
    {
        label: 'Falta de materiais de higienização',
        value: 'Falta de materiais de higienização'
    },
    {
        label: 'Arejamento inadequado do local de trabalho',
        value: 'Arejamento inadequado do local de trabalho'
    },
    {
        label: 'Aglomeração elevada de pessoas',
        value: 'Aglomeração elevada de pessoas'
    },    
    {
        label: 'Outro',
        value: 'Outro'
    },    
]

const Locais = [
    {
        label: 'local',
        value: 'local'
    }
]

const RelatarProblemaPage = () => {
    const [problema, setProblema] = useState('');
    const [local, setLocal] = useState('');
    
    const navigation = useNavigation()

    function handleNavigateBack() {
        navigation.goBack()
    }

    function handleProblemaSubmit() {

    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.main}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' size={20} color='#20BF6B' />
                </TouchableOpacity>

                <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
                    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                        <Text style={styles.title}>Qual foi o problema encontrado?</Text>
                        <RNPickerSelect 
                            placeholder={{ label: 'Selecione um problema da lista', value: 'problemaNaoSelecionado'}}
                            onValueChange={(value) => {
                                setProblema(value)
                            }}
                            items={Problemas}
                            style={pickerStyle}
                            Icon={() => {
                                return (
                                    <Icon name='chevron-down' color='#20BF6B' size={24} style={{ paddingHorizontal: 16, paddingVertical: 30 }} />
                                )
                            }}
                        />

                        <Text style={styles.title} >Descreva o ocorrido</Text>
                        <TextInput textAlignVertical='top' multiline={true} style={styles.input} />

                        <Text style={styles.title}>Qual seu local de trabalho?</Text>
                        <RNPickerSelect 
                            placeholder={{ label: 'Selecione o seu local de trabalho', value: 'localNaoSelecionado'}}
                            onValueChange={(value) => {
                                setLocal(value)
                            }}
                            items={Locais}
                            style={pickerStyle}
                            Icon={() => {
                                return (
                                    <Icon name='chevron-down' color='#20BF6B' size={24} style={{ paddingHorizontal: 16, paddingVertical: 30 }} />
                                )
                            }}
                        />

                    </KeyboardAvoidingView>

                    <Button title='Relatar problema' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={handleProblemaSubmit} />

                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default RelatarProblemaPage;

const pickerStyle = {
    inputIOS: {
        width: 320,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 20
    },
    inputAndroid: {
        width: 320,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 20
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
    },
    title: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16,
        paddingLeft: 15,
        fontWeight: 'bold',
        marginTop: 20
    },
    input: {
        width: 320,
        height: 260,
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        paddingTop: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 20,
        textAlignVertical: 'top'
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