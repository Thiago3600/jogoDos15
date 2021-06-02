import React, {useState, Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack'
import commonStyles from '../commonStyles'
import PassoStack from '../components/PassoStack'
import Menu from './Menu'
import NewContinue from './NewContinue'
import Options from './options'
import Game from './Game'

const Stack = createStackNavigator()

const configHeader = {
    headerShown: false
}

const initialState = {
    screenNavigation: 'Menu',
    newGame: true,
    clicked: false
}



export default class initScreen extends Component{

    state = {
        ...initialState
    }

    teste = (comand) => {

        switch(comand){
            case 'screen':
                return this.state.screenNavigation
                break
            case 'newGame':
                return this.state.newGame
                break
            case 'check':
                if(this.state.clicked){
                    this.setState({clicked: false})
                    return true
                }else{
                    return this.state.clicked
                }
                break
            default:
                return false
        }   
    }

    desativarClicked = () => {
        this.setState({clicked: false})
    }
    
    

    screenNameMenu = (name, params = true) =>{
        if(name){
            this.setState({screenNavigation: name, clicked: true})
            //console.log(`Nome ${name}`)
        }

        if(!params){

            this.setState({newGame: false})
        }else{

            this.setState({newGame: true})
        }
        
        
    }
    
  

    render() {
        return (
            <Stack.Navigator initialRouteName="Menu"
                screenOptions={configHeader}>

                <Stack.Screen name="Menu" >
                    {props => (
                        <PassoStack {...props} params={this.teste}>
                            <Menu funcao={this.screenNameMenu} />
                        </PassoStack>
                    )}
                </Stack.Screen>

                <Stack.Screen name="NewContinue" >
                    {props => (
                        <PassoStack {...props} params={this.teste} >
                            <NewContinue funcao={this.screenNameMenu}/>
                        </PassoStack>
                    )}
                    </Stack.Screen>

                <Stack.Screen name="Options" >
                    {props => (
                        <PassoStack {...props} params={this.teste} >
                            <Options funcao={this.screenNameMenu}/>
                        </PassoStack>
                    )}
                    </Stack.Screen>

                <Stack.Screen name="Game">
                    {props => (
                        <PassoStack {...props} params={this.teste}>
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