import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const CardList = () => {
    return (
        <>
            <View style={styles.card}>
                <Text style={styles.titleCard}>Atenção aos protocolos de Segurança e Higiene.</Text>
                <Text style={styles.textCard}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique mi nibh, vitae tempor orci facilisis sit amet. Donec porttitor sapien ut augue egestas tincidunt. Aenean velit nunc, ornare in varius eget, tincidunt ut nunc. Donec sit amet lacus eget nisi malesuada porta. Integer hendrerit ante dictum consectetur facilisis.</Text>
            </View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>
            <View style={styles.card}></View>

        </>
    )
}

export default CardList

const styles = StyleSheet.create({
    titleCard: {
        fontFamily: 'Ubuntu_700Bold',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 20,
        marginTop: 20,
        marginRight: 20
    },
    textCard: {
        margin: 20,
        fontFamily: 'Roboto_400Regular',
        fontSize: 17
    },
    card: {
        backgroundColor: '#fff',
        height: 300,
        width: 300,
        borderRadius: 35,
        marginLeft: 30,
        marginTop: 7,
        shadowOpacity: 0.2
    },
})