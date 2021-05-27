import React, { Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import commonStyles from '../commonStyles'
//import commonStates from ''


const initialState = {
    showGame: false,
}

export default class NewContinue extends Component{


    state = {
        ...initialState
    }

    

    render() {

        let funcao = this.props.funcao

        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttons}
                    activeOpacity={0.5}
                    onPress={() => {
                        funcao("Game", true)
                    }
                    }
                    >
                    <Text style={styles.buttonMenu}>Novo jogo</Text>
                </TouchableOpacity>
             

                <TouchableOpacity style={styles.buttons}
                    activeOpacity={0.5}
                    onPress={() => {
                        funcao("Game", false)
                    }
                    }
                    >
                    <Text style={styles.buttonMenu}>Continuar</Text>
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
        borderRadius: 15,
        margin: 20,
    },
    buttonMenu:{
        fontSize: 30,
        fontWeight: 'bold',
        margin: 0,

    }
})