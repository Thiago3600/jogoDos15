import React, {useState, Component} from 'react'
import {View , Text, StyleSheet } from 'react-native'
import Grade from '../components/Grade'
import Blocos from '../components/Blocos'
import stateGame from '../data/stateGame'
import AsyncStorage from '@react-native-community/async-storage'

export default props => {

    const [state, setState] = useState(stateGame)

    const _storeData = async (state) => {

        // console.log(`stateSave: ${state}`)
        const stateString = JSON.stringify(state)
        // console.log(`stateStringSave: ${stateString}`)
        try {
          await AsyncStorage.setItem('stateString', stateString);
        } catch (error) {
          // Error saving data
        }
      };
      const _retrieveData = async () => {
        // console.log(`We have data?`)
        try {
          const stateSave = await AsyncStorage.getItem('stateString');
          if (stateSave !== null) {
            // We have data!!
            // console.log(`We have data!: ${stateSave}`)
            const save = JSON.parse(stateSave)
            setDados(save)
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
      };

    function find_dimesions(layout){
        const {x, y, width, height} = layout;        
        setDados({width: width, height: height});
    }

    function getRandNumber(min, max){
        let aleatorio = Math.random() * (max - min) + min
        return aleatorio.toFixed(0)
    }
    
    function getRandNumberUniques(nums){
        const novo = getRandNumber(1, state.linhas * state.colunas)
        return nums.includes(novo) ? getRandNumberUniques(nums) : novo
    }

    function numPressionado(num){
        
        const checkNumber = number => number === num
        let blocos = state.blocos
        let blocoSelecionadoIndex = blocos.findIndex(checkNumber)
        let blocoVazioIndex = blocos.findIndex(n => n == state.blocos.length)

        if (blocoSelecionadoIndex === blocoVazioIndex + state.linhas ||
            blocoSelecionadoIndex === blocoVazioIndex - state.colunas ||
            blocoSelecionadoIndex === blocoVazioIndex + 1 ||
            blocoSelecionadoIndex === blocoVazioIndex - 1   ) {

            blocos[blocoVazioIndex] = state.blocos[blocoSelecionadoIndex]
            blocos[blocoSelecionadoIndex] = state.blocos.length
        }

        setDados({ blocos: blocos, numPress: num})
    }

    function setDados(estado){
        // console.log(`JSONStrSetestado ${JSON.stringify(estado)}`)
        setState({
            numPress: estado.numPress || state.numPress,
            blocos: estado.blocos || state.blocos,
            linhas: estado.linhas || state.linhas,
            colunas: estado.colunas || state.colunas,
            numGerado: estado.numGerado || state.numGerado,
            width: estado.width || state.width,
            height: estado.height || state.height,
        })
            
        let dados = JSON.stringify(state)
        // console.log(`JSONStrSetDados ${dados}`)
        _storeData(state)
    }

    function dispatch(action){

        if(action.type === 'qtdBlocos'){
            return state.linhas * state.colunas
        }
        if(action.type === 'blocosNumeros'){

            if(!state.numGerado){
                const blocosNumeros = new Array(state.linhas * state.colunas).fill(0).reduce(n => [...n, getRandNumberUniques(n)], [])
                setDados({ blocos: blocosNumeros , numGerado: true})
            }
            return state.blocos
        }
        if(action.type === 'numPressionado'){
            const num = action.payload
            numPressionado(num)
        }
        if(action.type === 'dimensionBlock'){
            return {
                width: (state.width / state.linhas) - 1,
                height: (state.height / state.colunas) - 1
            }
        }
        



        return 
    }

    
      

    
    


    const newGame = props.route.params
    if(!newGame && !state.numGerado){
        _retrieveData()
    }

    
    
    return (
        <View style={styles.container}>
            <View style={styles.boxFora}>
                <View style={styles.boxDentro} onLayout={(event) => {find_dimesions(event.nativeEvent.layout) }} >
                    <Blocos funcao={dispatch} />
                </View>
            </View>
        </View>

    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    boxFora:{
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: '60%',
        backgroundColor: '#E8510C',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    boxDentro:{
        margin: 0,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: '100%',
        backgroundColor: '#E8CF4F',
        borderRadius: 0
    }
})