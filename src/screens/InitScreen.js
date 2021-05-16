import React, {useState, Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import commonStyles from '../commonStyles'
import PassoStack from '../components/PassoStack'
import Menu from './Menu'
import Game from './Game'

const Stack = createStackNavigator()

const configHeader = {
    headerShown: false
}

const initialState = {
    screenNavigation: 'Menu'
}

export default class initScreen extends Component{

    state = {
        ...initialState
    }
    
    
  

    render() {


        const screenName = name =>{
            if(name){
                this.setState({screenNavigation: name})
            }
        }

        return (
            <Stack.Navigator initialRouteName="Menu"
                screenOptions={configHeader}>
                <Stack.Screen name="Menu" >
                {props => (
                    <PassoStack {...props} avancar={this.state.screenNavigation} >
                        <Menu funcao={screenName} />
                    </PassoStack>
                )}
                </Stack.Screen>
                <Stack.Screen name="Game">
                    {props => (
                        <PassoStack {...props} voltar>
                            <Game />
                        </PassoStack>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    
})