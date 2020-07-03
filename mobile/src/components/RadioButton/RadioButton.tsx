import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'

interface IProps {
    PROP: prop[]
    
}
interface prop {
    key: string,
    Text: string
}

interface IState {
}

export default class RadioButton extends Component<IProps> {
    state = {
        value: null,
    }

    constructor(props:IProps) {
        super(props)
    }

    render() {
        const { PROP } = this.props;
        const { value } = this.state;

        return(
            <View style={{flex:1, flexDirection: 'row'}}>
                {PROP.map(res => {
                    return(
                        <View key={res.key} style={styles.container}>
                            <TouchableOpacity
								style={styles.radioCircle}
								onPress={() => {
                                    this.setState({
                                        value: res.key,
									});
								}}
                                   
                            >
                                    {value === res.key && <View style={styles.selectedRb} />}
                            </TouchableOpacity>
                            <Text style={styles.radioText}>{res.Text}</Text>
                        </View>
                    );
                })}
                {/* <Text> Selected: {this.state.value} </Text> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 35,
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    radioText: {
        marginLeft: 10,
        fontSize: 20,
        color: '#000000',
        fontFamily: 'Roboto_400Regular'
    },
    radioCircle: {
        height: 24,
        width: 24,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: '#B4BFC9',
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedRb: {
        width: 13,
        height: 13,
        borderRadius: 50,
        backgroundColor: '#20BF6B',

    }
})