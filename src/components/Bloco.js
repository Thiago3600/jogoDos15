import React, { Component} from 'react'
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import {getWidthBlock, getHeightBlock} from '../data/stateGame'

const initialState = {
    // width: getWidthBlock,
    // height: getHeightBlock,
    // numPress: 0,
}

export default props => {

    const number = props.number
    const dimensionBlock = props.dimension
    const numPress = props.numPress
    const qtdBlocos = props.qtdBlocos
    let estilo = [styles.container]
    let estiloTxt = [styles.blocoTxt]

    estilo.push(dimensionBlock())

    
    
    if(number == qtdBlocos()){
        estilo.push(styles.vazio)
        estiloTxt.push(styles.blocoVazioTxt)
    }else{
        estilo.push(styles.cheio)
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => numPress(number)}>
            <View style={[estilo]}>
                <Text style={[estiloTxt]}>{number}</Text>
            </View>
        </TouchableOpacity>
    )
    
}
const styles = StyleSheet.create({
    container: {
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    blocoTxt:{
        fontSize: RFValue(412/(8+8 + 4), 412)
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