import React, { Component} from 'react'
import {View, Text, StyleSheet,TouchableOpacity} from 'react-native'
import Bloco from './Bloco'




export default props => {   


    let state = props.funcao

    

    function getDimension(){
        return state({type: 'dimensionBlock'})
    }

    function numPressionado(num){
        state({
            type: 'numPressionado',
            payload: num
        })
    }

    function getQtdBlock(){
        return state({type: 'qtdBlocos'})
    }
    

    


    function getBlocos(){
        let blocosNumeros = state({type: 'blocosNumeros'})
        let blocos = []            
        blocos = blocosNumeros.map(numero => {
                return (<Bloco key={Math.random()} 
                                number={numero} 
                                dimension={getDimension} 
                                numPress={numPressionado} 
                                qtdBlocos={getQtdBlock}
                                
                                />)
            }
        )
        return blocos
    }

    

    return (
        <View style={styles.container}>
           {getBlocos()}
        </View>
    )
    
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
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