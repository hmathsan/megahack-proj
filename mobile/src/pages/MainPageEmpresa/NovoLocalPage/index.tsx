import React, { useState } from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useNavigation, useRoute } from '@react-navigation/native'
import { View, TouchableOpacity, SafeAreaView, StyleSheet, KeyboardAvoidingView, TextInput, Text, ScrollView, Platform, Alert } from 'react-native'
import { Feather as Icon } from '@expo/vector-icons'
import { Button } from 'react-native-elements'

import Axios from 'axios'
import api from '../../../services/api'

const apiKey = 'BfAwODTKQDR9Anl3I65d6b7wUaGVZGdH'
const apiBaseUrl = 'http://open.mapquestapi.com/geocoding/v1/address'

interface MapResponse {
    results:Geometry[]
}

interface Geometry {
    providedLocation: ProvidedLocation,
    locations:Locations[]
}

interface ProvidedLocation {
    location: string
}

interface Locations {
    latLng:LatLng
}

interface LatLng {
    lat: string,
    lng: string
}

interface Users {
    id: number,
    tipo: string,
    nome: string,
    sobrenome: string,
    email: string,
    empresa: string,
    senha: string
}

const NovoLocalPage = () => {
    const [nome, setNome] = useState('');

    const [address, setAdress] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    const navigation = useNavigation();
    const route = useRoute();
    const routeParams = route.params as Users

    function handleNavigateBack() {
        navigation.goBack();
    }

    async function handleAdressSearch() {
        const location =address.replace(' ', '+')

        await Axios.get<MapResponse>(`http://open.mapquestapi.com/geocoding/v1/address?key=${apiKey}&location=${location}`).then(response => {
            const locations = response.data.results.map(result => result.locations)
            const locate:Locations[] = locations[0].map(locate => locate)
            const latLng = locate.map(lat => lat.latLng)
            const lat = locate.map(lat => lat.latLng.lat)
            const lng = locate.map(lat => lat.latLng.lng)

            setLatitude(lat[0])
            setLongitude(lng[0])
        })
    }

    function handleSubmit() {
        if(nome === '' || latitude === '' || longitude === '' ){
            Alert.alert(
                'Dados incompletos',
                'Verifique se todos os campos estão preenchidos',
                [{text: 'OK'}]
                )
        } else {
            handlePost()
        }
    }

    async function handlePost() {
        const data = {
            empresa: routeParams.empresa,
            nome,
            longitude,
            latitude
        }

        await api.post('locations', data, {headers: { 'Content-Type': 'application/json'}})

        Alert.alert(
            'Local cadastrado com sucesso',
            'Agora os funcionários poderam reportar deste local',
            [{text: 'Continuar', onPress: () => {navigation.goBack()}}]
        )
    }
    
    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.main}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' size={20} color='#20BF6B' />
                </TouchableOpacity>

                <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : undefined} >
                    <ScrollView showsVerticalScrollIndicator={true} >
                        <Text style={styles.inputName}>Nome do local:</Text>
                        <TextInput style={styles.input} onChangeText={text => setNome(text)} />

                        <Text style={styles.inputName} >Insira o endereço:</Text>
                        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                            <TextInput style={styles.inputMap} onChangeText={text=>setAdress(text)} />
                            <Button 
                                title='Procurar'
                                onPress={handleAdressSearch}
                                buttonStyle={styles.searchButton}
                                titleStyle={styles.buttonText}
                            />
                        </View>
                        
                        <MapView 
                            style={styles.map}
                            initialRegion={{latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421}}
                            region={{latitude: Number(latitude), longitude: Number(longitude), latitudeDelta: 0.008, longitudeDelta: 0.001}}
                        >    
                            {latitude === '' ? null
                            : <Marker
                                key={1}
                                coordinate={{latitude: Number(latitude), longitude: Number(longitude)}}
                                pinColor='red'
                                
                            >
                                <View style={styles.mapMarkerContainer}>
                                    <Text style={styles.mapMarkerTitle}>{nome}</Text>
                                </View>
                                </Marker>
                            }
                        </MapView>

                        <Button title='Cadastrar' titleStyle={styles.buttonText} buttonStyle={styles.button} onPress={handleSubmit} />

                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    )
}

export default NovoLocalPage;

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingHorizontal: 27,
        paddingTop: 20
    },
    map: {
        height: 300,
        width: 320,
        borderRadius: 15,
        marginTop:20,
        alignSelf: 'center'
    },
    input: {
        width: 320,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 20,
        alignSelf: 'center',
        padding: 15
    },
    inputName: {
        fontFamily: 'Ubuntu_700Bold',
        fontSize: 16,
        paddingLeft: 15,
        fontWeight: 'bold',
        marginTop: 20
    },
    inputMap: {
        width: 220,
        height: 45,
        backgroundColor: '#fff',
        borderRadius: 15,
        fontFamily: 'Roboto_400Regular',
        marginTop: 20,
        alignSelf: 'center',
        padding: 15
    },
    searchButton: {
        width: 80,
        height: 45,
        marginTop: 20,
        borderRadius: 15,
        marginLeft: 10,
        backgroundColor: '#20BF6B'
    },
    buttonText: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold'
    },
    mapMarkerContainer: {
        width: 90,
        height: 25,
        backgroundColor: '#34CB79',
        flexDirection: 'column',
        borderRadius: 8,
        overflow: 'hidden',
        alignItems: 'center'
    },
    mapMarkerTitle: {
        flex: 1,
        fontFamily: 'Roboto_400Regular',
        color: '#FFF',
        fontSize: 13,
        lineHeight: 23,
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