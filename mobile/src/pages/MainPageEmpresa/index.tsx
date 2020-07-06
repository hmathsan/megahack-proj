import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, ScrollView, Platform } from 'react-native'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Button, Card } from 'react-native-elements'
import { Feather as Icon } from '@expo/vector-icons'
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

interface Reports {
    id: number,
    description: string,
    empresa: string,
    latitude: string,
    longitude: string,
    nome: string,
    type: string,
}

const MainPageEmpresa = () => {
    const [allReports, setAllReports] = useState<Reports[]>([]);

    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Users;

    useEffect(() => {
        api.get('reports', {
            params: {
                empresa: routeParams.empresa
            }
        }).then(response => {
            setAllReports(response.data)
        })
    }, [])

    function handleLocalNavigation() {
        navigation.navigate('NovoLocalPage', routeParams);
    }

    function handleMapNavigation() {
        navigation.navigate('ReportMapPage', routeParams)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.main}>
                <View style={styles.container} >
                    <Text style={styles.bemVindo}>Bem vindo de volta!</Text>
                    <View style={styles.nameCard}>
                        <Text style={styles.name}>{routeParams.nome}</Text>
                        <View style={styles.cardInside}>
                            <Text style={styles.empresa} >{routeParams.empresa}</Text>
                            {Platform.OS === 'ios' ? <Button icon={<Icon name='map' size={24} color='#fff' />} iconRight={true} title='Cadastrar local ' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={handleLocalNavigation} /> : <></>}
                            
                        </View>
                    </View>

                </View>
            </View>
            <View style={{flex: 1, justifyContent: 'center', marginTop: 10}}>
                {Platform.OS === 'android' ? <Button icon={<Icon name='map' size={24} color='#fff' />} iconRight={true} title='Cadastrar local ' titleStyle={styles.buttonTitle} buttonStyle={styles.button} onPress={handleLocalNavigation} /> : <></>}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <Text style={styles.title}>{allReports.length} Problema Reportado</Text>
                    {/* <Button
                        icon={
                            <Icon name='arrow-right' size={24} color='#fff' />
                        }
                        iconRight={true}
                        title='Verificar no mapa '
                        titleStyle={styles.buttonTitle}
                        buttonStyle={styles.button}
                        onPress={handleMapNavigation}
                    /> */}
                </View>
                <ScrollView
                    style={{ marginTop: 20,  }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{justifyContent: 'center', alignItems: 'center' }}
                >
                    {allReports.map(report => (
                        <TouchableOpacity key={String(report.id)} style={styles.card} >
                            <Text style={styles.cardTitle}>{report.nome}</Text>
                            <Text style={styles.cardTitle}>{report.type}</Text>
                            <Text style={styles.report}>{report.description}</Text>
                        </TouchableOpacity>
                    ))}

                </ScrollView>
            </View>

        </View>
    )
}

export default MainPageEmpresa;

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
    cardInside: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    name: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 46,
        marginTop: 20
    },
    empresa: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
    },
    title: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 30
    },
    buttonTitle: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16
    },
    button: {
        width: 170,
        height: 40,
        alignSelf: 'center',
        borderRadius: 35,
        backgroundColor: '#20BF6B',
        marginLeft: 10
    },
    card: {
        width: 320,
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 35,
        shadowOpacity: 0.2,
        marginTop: 10,
        marginBottom: 20,
    },
    cardTitle: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 10
    },
    report: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 10
    }
})