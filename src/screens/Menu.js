import React, { Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import commonStyles from '../commonStyles'
import Game from './Game'

const Stack = createStackNavigator()

const initialState = {
    showGame: false,
}

export default class initScreen extends Component{


    state = {
        ...initialState
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttons}
                    activeOpacity={0.8}>
                    <Text style={styles.buttonMenu}>Jogar</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 0,
        backgroundColor: commonStyles.configMenu.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttons:{
        backgroundColor: 'white',
        paddingHorizontal: '20%',
        borderColor: 'black',
        borderWidth: 4,
        borderRadius: 15
    },
    buttonMenu:{
        fontSize: commonStyles.configMenu.fontSize,
        fontWeight: 'bold',
    }
})