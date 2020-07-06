import React, { useEffect, useState } from 'react'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation, useRoute } from '@react-navigation/native'
import MapView, {Marker} from 'react-native-maps'
import * as Location from 'expo-location'
import * as Permissions from 'expo-permissions'
import { View, SafeAreaView, TouchableOpacity, StyleSheet, Text, Dimensions, Alert } from 'react-native'

import api from '../../../services/api'

interface Users {
    id: number,
    tipo: string,
    nome: string,
    sobrenome: string,
    email: string,
    empresa: string,
    senha: string
}

interface Location {
    latitude: number,
    longitude: number,
    latitudeDelta: number,
    longitudeDelta: number
}

interface Reports {
    user_id: number,
    type: string,
    latitude: string,
    longitude: string,
    description: string,
    empresa: string
}

const ReportMapPage = () => {

    const [reports, setReports] = useState<Reports[]>()
    const [currentLocation, setCurrentLocation] = useState<Location>();
    const [allLocations, setAllLocations] = useState<Reports>()

    const navigation = useNavigation();
    const route = useRoute()
    const routeParams = route.params as Users


    useEffect(()=> {
        getGeoLocation()
    }, [])

    useEffect(() => {
        api.get('reports').then(response => {
            setReports(response.data)
        })
    }, [])

    function handleNavigateBack() {
        navigation.goBack()
    }

    async function getGeoLocation() {
        let {status} = await Permissions.askAsync(Permissions.LOCATION);
        console.log(status)
        if(status !== 'granted') {
            return Alert.alert(
                'Localização não autorizada',
                'É necessário que permita o uso de Geo Localização para usar o mapa',
                [{text: 'Voltar', onPress: () => navigation.goBack()}]
            ) 
        }

        const location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Balanced})
        const {latitude, longitude} = location.coords

        setCurrentLocation({latitude, longitude, latitudeDelta: 1, longitudeDelta:1});
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.main}>
                <TouchableOpacity onPress={handleNavigateBack}>
                    <Icon name='arrow-left' size={20} color='#20BF6B' />
                </TouchableOpacity>

                <View style={styles.container}>
                    <Text style={styles.title}>Selecione no mapa o local desejado:</Text>
                    <MapView 
                        style={styles.map}
                        initialRegion={currentLocation}
                    >
                        
                    </MapView>
                </View>
            </View>

        </SafeAreaView>
    )
}

export default ReportMapPage;

const styles = StyleSheet.create({
    main: {
        flex:1,
        paddingHorizontal: 27,
        paddingTop: 20,
    },
    map: {
        marginTop: 20,
        height: Dimensions.get('window').height / 1.3,
        borderRadius: 15
    },
    container: {
        justifyContent:'center',
    },
    title: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10,
        marginTop: 20
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
})