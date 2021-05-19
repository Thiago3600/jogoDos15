import React, { Component} from 'react'
import {View , Text, StyleSheet } from 'react-native'
import Grade from '../components/Grade'

export default class Game extends Component {

    
    
    render() {
        const newGame = this.props.route.params

        return (
            <View style={styles.container}>
                <View style={styles.boxFora}>
                    <View style={styles.boxDentro}>
                        <Grade linhas={4} colunas={4} newGame={newGame} />
                    </View>
                </View>
            </View>
        )
    }
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