import React, { Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import 'react-native-gesture-handler';
import commonStyles from '../commonStyles'


const initialState = {
    showGame: false,
}

export default class Menu extends Component{


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
                        funcao("NewContinue")
                    }
                    }
                    >
                    <Text style={styles.buttonMenu}>Jogar</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttons}
                    activeOpacity={0.5}
                    onPress={() => {
                        funcao("Options")
                    }
                    }
                    >
                    <Text style={styles.buttonMenu}>Opções</Text>
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
        width:'90%',
        
        borderColor: 'black',
        borderWidth: 4,
        borderRadius: 15,
        marginVertical: '5%',
    },
    buttonMenu:{
        fontSize: commonStyles.configMenu.fontSize,
        fontWeight: 'bold',
        textAlign: 'center',
    }
})