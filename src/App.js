import React, {Component} from 'react'
import {SafeAreaView, Text, StyleSheet} from 'react-native'
import InitScreen from './screens/InitScreen'
import { NavigationContainer } from '@react-navigation/native'



export default class App extends Component {
    render(){
        return (
            <SafeAreaView style={styles.container}>
                <NavigationContainer>
                    <InitScreen />
                </NavigationContainer>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        backgroundColor: 'black'
    }
})