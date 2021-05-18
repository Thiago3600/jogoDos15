import React, {useState, Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import commonStyles from '../commonStyles'
import PassoStack from '../components/PassoStack'
import Menu from './Menu'
import NewContinue from './NewContinue'
import Game from './Game'

const Stack = createStackNavigator()

const configHeader = {
    headerShown: false
}

const initialState = {
    screenNavigation: 'Menu',
    newGame: 'newGame',
    continue: 'continue',
    gameParams: null
}

export default class initScreen extends Component{

    state = {
        ...initialState
    }
    

    screenNameMenu = (name, params = true) =>{
        if(name){
            this.setState({screenNavigation: name})
            console.log(`Nome ${name}`)
        }
        if(params != null){
            this.setState({gameParams: this.state.newGame})
        }else if(params){
            this.setState({gameParams: this.state.continue})
        }
        
    }
    
  

    render() {
        return (
            <Stack.Navigator initialRouteName="Menu"
                screenOptions={configHeader}>
                <Stack.Screen name="Menu" >
                {props => (
                    <PassoStack {...props} avancar={this.state.screenNavigation}>
                        <Menu funcao={this.screenNameMenu} />
                    </PassoStack>
                )}
                </Stack.Screen>
                <Stack.Screen name="NewContinue" >
                {props => (
                    <PassoStack {...props} avancar={this.state.screenNavigation} params={this.state.gameParams}>
                        <NewContinue funcao={this.screenNameMenu}/>
                    </PassoStack>
                )}
                </Stack.Screen>
                {console.log(`params ${this.state}`)}
                <Stack.Screen name="Game">
                    {props => (
                        <PassoStack {...props}>
                            <Game {...props} />
                        </PassoStack>
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    
})