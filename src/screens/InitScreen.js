import React, { Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import commonStyles from '../commonStyles'
import Menu from './Menu'
import Game from './Game'

const Stack = createStackNavigator()


export default class initScreen extends Component{


   

    render() {
        return (
            <Stack.Navigator initialRouteName="Menu" >
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="Game" component={Game} />
            </Stack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    
})