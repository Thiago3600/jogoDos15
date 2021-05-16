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
        ...initialState
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

        


  
        console.log(`blocoVazioIndex       = ${blocoVazioIndex}`)
        console.log(`blocoSelecionadoIndex = ${blocoSelecionadoIndex}`)

        this.setState({numPress: num, blocos: blocos})
    }

    getBlocos = async (col, lin) => {

        const stateString = await AsyncStorage.getItem('arrayNumbers4x4')
        const state = JSON.parse(stateString) || initialState
        this.setState(state)

        let numBlocos = lin * col
        let blocosNumeros = this.state.blocos
        let blocos = []
       // this.setState({linhas: lin, colunas: col})
        console.log(`blocosNumeros =     ${blocosNumeros}`)
        console.log(`this.state.blocos = ${this.state.blocos}`)
        console.log("")

        //this.setState({ myArray: [...this.state.myArray, ...[1,2,3] ] }) //another array

        if(!this.state.numGerado){
            blocosNumeros = new Array(numBlocos).fill(0).reduce(n => [...n, this.getRandNumberUniques(n)], [])
            this.setState({blocos: [...this.state.blocos, ...blocosNumeros], numGerado: true})
        }
        console.log(`blocosNumeros =     ${blocosNumeros}`)
        console.log(`this.state.blocos = ${this.state.blocos}`)
        console.log("")
        
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