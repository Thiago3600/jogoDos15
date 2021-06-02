import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput} from 'react-native'


export default props => {

    const [state, setState] = useState({
        nome: ''
    })


    return (
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel} animationType='fade'>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View  style={styles.background} >
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={nome => setState({nome: nome })}
                    value={state.nome}
                    placeholder='Digite se nome'
                        />
                <TouchableOpacity onPress={() => {
                    const fn = props.setName
                    
                    console.log(`${state.nome}`)
                    fn(state.nome)
                }}>
                    <Text style={styles.buttonSave}>Salvar</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={props.onCancel} style={styles.background}>
                <View  style={styles.background} >
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
    
}

const styles = StyleSheet.create({
    background:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerRow: {
        flex: 0,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 50
    },
    txt: {
        fontSize: 24,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15
    },
    input: {
        flex: 0,
        marginHorizontal: 10,
        borderRadius: 8,
        borderWidth: 1,
        marginVertical: 15,
        marginHorizontal: 10,
        width: '60%',
        
    },
    buttonSave: {
        fontSize: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15
    },
    txtRepeat: {
        fontSize: 20,
        borderWidth: 1,
        padding: 10,
        borderRadius: 15
    }
})