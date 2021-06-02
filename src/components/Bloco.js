import React, {useState, Component} from 'react'
import {View, Text, StyleSheet,TouchableOpacity, Dimensions} from 'react-native'
import commonStyles from '../commonStyles'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
//import {getWidthBlock, getHeightBlock} from '../data/stateGame'

const initialState = {
    // width: getWidthBlock,
    // height: getHeightBlock,
    // numPress: 0,
}

export default props => {

    const [state, setState] = useState({
        findDimension: false,
        sizeFont: 60
    })


    const number = props.number
    const dimensionBlock = props.dimension
    const numPress = props.numPress
    const qtdBlocos = props.qtdBlocos
  

    function find_dimesions(layout){
        const {width, height} = layout; 
        //console.log(`width: ${width}, height: ${height}`)       
        //setState({findDimension: true, sizeFont: height / 2})
    }

    

    let estilo = [styles.container]
    let estiloTxt = []

    estilo.push(dimensionBlock())

    
    
    if(number == qtdBlocos()){
        estilo.push(styles.vazio)
        estiloTxt.pop()
        estiloTxt.push(styles.blocoVazioTxt)
    }else{
        estilo.push(styles.cheio)
    }

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={() => numPress(number)}>
            <View style={[estilo]} onLayout={(event) => {
                        // if(!state.findDimension){
                        //     find_dimesions(event.nativeEvent.layout)
                        // }
                    }} >
                <Text style={[estiloTxt, {
                    fontSize: state.sizeFont
                }]}>{number}</Text>
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
    vazio:{
        backgroundColor: 'rgba(0,0,0,0)',
    },
    cheio:{
        borderColor: commonStyles.configBloco.borderBox,
        borderWidth: 1,
        backgroundColor: commonStyles.configBloco.insideBox,
        borderRadius: 5
    },
    blocoVazioTxt:{
        color: 'rgba(0,0,0,0)',
    },
    blocoCheioTxt:{
        color: commonStyles.configBloco.colorTxt
    }
})