import React, { Component} from 'react'
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native'

const initialState = {
    width: 0,
    height: 0,
    numPress: 0,
}

export default class Bloco extends Component {

    state = {
        ...initialState,
    }


    
    
    render() {
        
        const number = this.props.number
        let numPress = this.props.numeroPressionado
        let estilo = [styles.container]
        let estiloTxt = [styles.blocoTxt]

        if(number == 16){
            estilo.push(styles.vazio)
            estiloTxt.push(styles.blocoVazioTxt)
        }else{
            estilo.push(styles.cheio)
        }

        return (
            <TouchableOpacity activeOpacity={0.9} onPress={() => {
                                                        this.setState({numPress: number})
                                                        numPress(number)
                                                    }} >
                <View style={[estilo, {
                            height: (this.props.params.blocoHeight) / 4,
                            width: (this.props.params.blocoWidth - 1) / 4
                        }]} >
                        <Text style={estiloTxt}>{number}</Text>
                </View>
            </TouchableOpacity>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    blocoTxt:{
        fontSize: 60,
    },
    vazio:{
        backgroundColor: 'rgba(0,0,0,0)',
    },
    cheio:{
        borderColor: '#000',
        borderWidth: 1,
        backgroundColor: '#CCC',
        borderRadius: 5
    },
    blocoVazioTxt:{
        color: 'rgba(0,0,0,0)',
    }
})