import React, { Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import commonStyles from '../commonStyles'
import Menu from './Menu'
import Game from './Game'

const Stack = createStackNavigator()

const configHeader = {
    headerShown: false
}


export default class initScreen extends Component{


   

    render() {
        return (
            <Stack.Navigator initialRouteName="Menu"
                screenOptions={configHeader}>
                <Stack.Screen name="Menu" component={Menu} />
            </Stack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    
})