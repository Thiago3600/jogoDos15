import React, { Component, useContext, useState, useEffect, Fragment } from 'react'
import ReactNative, { View, Text, StyleSheet, Dimensions, findNodeHandle, SafeAreaView,} from 'react-native'
import Bloco from './Blocos'
import GameContext from '../context/GameContext'
import {initialStateObj} from '../data/stateGame'

const initialState = {
  ...initialStateObj()
}



export default props => {
  

  
  const {dispatch} = useContext(GameContext)
  const [state, setState] = useState(initialState)

    

    let linhas = props.linhas
    let colunas = props.colunas
    let newGame = props.newGame



    
   

    function find_dimesions(layout){
        const {x, y, largura, altura} = layout;
        setDados({width: largura, height: altura});
        console.log(`findDimesions W:${largura} H:${altura}`)
        
    }

    // const calculateDimensions = () => {
    //     this.refs.innerView.measureLayout(ReactNative.findNodeHandle(this.refs.containerView), (xPos, yPos, Width, Height) => {
    //       setDados({width: Width, height: Height });
    //     });
    //     console.log(`findDimesions W:${width} H:${height}`)
    //   }



    function setDados(estado){

        setState({
            numPress: estado.numPress || state.numPress,
            blocos: estado.blocos || state.blocos,
            linhas: estado.linhas || state.linhas,
            colunas: estado.colunas || state.colunas,
            numGerado: estado.numGerado || state.numGerado,
            width: estado.width || state.width,
            height: estado.height || state.height,
        })
        // let dados = JSON.stringify(state)
        // console.log(`JSONStrSetDados ${dados}`)
        dispatch({type: 'saveGame', payload:state})
        dispatch({type: 'getGameState'})
    }
    
    
      const getRandNumber = (min, max) => {
        let aleatorio = Math.random() * (max - min) + min
        return aleatorio.toFixed(0)
    }
    
    const getRandNumberUniques = nums => {
        const novo = getRandNumber(1, 16)
        return nums.includes(novo) ? getRandNumberUniques(nums) : novo
    }


    const numPressionado = (num) => {
        
        const checkNumber = number => number === num
        let blocos = state.blocos
        let blocoSelecionadoIndex = blocos.findIndex(checkNumber)
        let blocoVazioIndex = blocos.findIndex(n => n == state.blocos.length)

        if (blocoSelecionadoIndex === blocoVazioIndex + 4 ||
            blocoSelecionadoIndex === blocoVazioIndex - 4 ||
            blocoSelecionadoIndex === blocoVazioIndex + 1 ||
            blocoSelecionadoIndex === blocoVazioIndex - 1   ) {

            blocos[blocoVazioIndex] = state.blocos[blocoSelecionadoIndex]
            blocos[blocoSelecionadoIndex] = state.blocos.length
        }

        setDados({
            numPress: num,
            blocos: blocos,
        })
    }
    
    
    
    const getBlocos = (col, lin, newGame) => {
        let numBlocos = lin * col
        let blocosNumeros = state.blocos || initialStateObj().blocos
        let blocos = []
        if(state.numGerado === undefined)setDados({numGerado: true})
        if(!state.numGerado && newGame){
            blocosNumeros = new Array(numBlocos).fill(0).reduce(n => [...n, getRandNumberUniques(n)], [])
            setDados({blocos: blocosNumeros, numGerado: true, linhas: lin, colunas: col})
        }    
        blocos = blocosNumeros.map(numero => {
            return (<Bloco key={Math.random()} numeroPressionado={numPressionado} number={numero} />)
        }
        )
        return blocos
    }

    return (
            // <View style={styles.container} onResponde >
            //     {
            //         getBlocos(linhas, colunas, newGame)
            //     }
            // </View>
            <View style={styles.container} onLayout={(event) => {find_dimesions(event.nativeEvent.layout) }} >
                {
                    getBlocos(linhas, colunas, newGame)
                }
            </View>
        )
    
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})