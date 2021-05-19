import React, { Component} from 'react'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import Bloco from '../components/Bloco'

const initialState = {
    blocoWidth: 0,
    blocoHeight: 0,
    numPress: 16,
    blocos: [],
    linhas: 0,
    colunas: 0,
    numGerado: false
}



export default class Grade extends Component {

    state = {
        ...initialState,
        newGame : this.props.newGame
    }

    

    componentDidMount = () => {
        this._retrieveData()
    }

    _storeData = async (state) => {

        const stateString = JSON.stringify(state)

        try {
          await AsyncStorage.setItem(
            'stateString',
            stateString
          );
        } catch (error) {
          // Error saving data
        }
      };

      _retrieveData = async () => {
        try {
          const stateSave = await AsyncStorage.getItem('stateString');
          if (stateSave !== null) {
            // We have data!!
            const state = JSON.parse(stateSave) || initialState
            console.log(state.blocos)
            this.setState(state);
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
      };

    saveState = (state) => {
        this._storeData(state)        
    }

    find_dimesions(layout){
        const {x, y, width, height} = layout;
        this.setState({blocoWidth: width, blocoHeight: height})
      }


    
    
    getRandNumber = (min, max) => {
        let aleatorio = Math.random() * (max - min) + min
        return aleatorio.toFixed(0)
    }
    
    getRandNumberUniques = nums => {
        const novo = this.getRandNumber(1, 16)
        return nums.includes(novo) ? this.getRandNumberUniques(nums) : novo
    }


    numPressionado = (num) => {
        
        const checkNumber = number => number === num
        let blocos = this.state.blocos
        let blocoSelecionadoIndex = blocos.findIndex(checkNumber)
        let blocoVazioIndex = blocos.findIndex(n => n == this.state.blocos.length)

        if (
                blocoSelecionadoIndex === blocoVazioIndex + 4 ||
                blocoSelecionadoIndex === blocoVazioIndex - 4 ||
                blocoSelecionadoIndex === blocoVazioIndex + 1 ||
                blocoSelecionadoIndex === blocoVazioIndex - 1
            ) {
            blocos[blocoVazioIndex] = this.state.blocos[blocoSelecionadoIndex]
            blocos[blocoSelecionadoIndex] = this.state.blocos.length
        }

        this.setState({numPress: num, blocos: blocos})
        this.saveState(this.state)
    }



    getBlocos = (col, lin) => {

        let numBlocos = lin * col
        let blocosNumeros = this.state.blocos
        let blocos = []

        if(!this.state.numGerado){
            blocosNumeros = new Array(numBlocos).fill(0).reduce(n => [...n, this.getRandNumberUniques(n)], [])
            this.setState({blocos: [...this.state.blocos, ...blocosNumeros], numGerado: true})
        }        
        blocos = blocosNumeros.map(numero => {
            return (<Bloco key={Math.random()} numeroPressionado={this.numPressionado} params={this.state} number={numero} />)
        }
    )
        
        return(blocos)
    }



    render() {

        let linhas = this.props.linhas
        let colunas = this.props.colunas
        return (
            <View style={styles.container} onLayout={(event) => { this.find_dimesions(event.nativeEvent.layout) }} >
                {this.getBlocos(linhas, colunas)}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})