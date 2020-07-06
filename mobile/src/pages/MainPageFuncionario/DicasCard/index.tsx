import React from 'react'
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native'

const CardList = () => {
    async function handleLinking() {
        await Linking.openURL('https://www.sebrae.com.br/Sebrae/Portal%20Sebrae/retomada/empresario/ebook/ebook_Industria-da-Construcao.pdf')
    }

    return (
        <>
            <View style={styles.card}>
                <Text style={styles.titleCard}>Atenção aos protocolos Higiene.</Text>
                <Text style={styles.textCard}>Tanto a higienização pessoal e dos equipamentos de trabalho são indispensáveis para combater o COVID-19. Portanto lave-as mãos com água e sabão ou faço utilize álcool.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.titleCard}>Atenção para o uso de máscara.</Text>
                <Text style={styles.textCard}>O distanciamento social e o uso de máscaras são essenciais. Por isso mantenha-se numa distancia mínima de 1.5 metros de outras pessoas e sempre utilizando a máscara cobrindo boca e nariz.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.titleCard}>Atenção para a higiene dos equipamentos.</Text>
                <Text style={styles.textCard}>A limpeza constante dos equipamentos de trabalho são fundamentais, ainda mais se compartilhados com outras pessoas. Por isso, sempre higienize o equipamento depois de usado.</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.titleCard}>Atenção para possiveis infectados.</Text>
                <Text style={styles.textCard}>Cuidar dos frequentadores do local, assim certificando da temperatura corporal de cada um, e impedindo a entrada para temperaturas acima de 37,8 °C.</Text>
            </View>
            <TouchableOpacity style={styles.card} onPress={handleLinking}>
                <Text style={styles.titleCard}>Mais dicas e informações.</Text>
                <Text style={styles.textCard}>Para mais dicas e informações, clique aqui e acesse o e-book disponibilizado pela Sebrae sobre os cuidados da pandemia..</Text>
            </TouchableOpacity>

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
        height: 260,
        width: 300,
        borderRadius: 35,
        marginLeft: 20,
        marginTop: 7,
        shadowOpacity: 0.2,
        marginRight: 10
    },
})