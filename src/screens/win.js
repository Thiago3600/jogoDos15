import React, {Component} from 'react';
import {View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity} from 'react-native'


export default class WinGame extends Component {

    render(){
        return (
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='fade'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View  style={styles.background} >
                    </View>
                </TouchableWithoutFeedback>

                <View style={styles.container}>
                    <Text style={styles.txt} >Voce completou a fase</Text>
                    <View style={styles.containerRow}>
                        <TouchableOpacity>
                            <View style={styles.containerQuestion} >
                                <Text style={styles.txtRepeat} >Repetir</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.props.proxFase}>
                            <View  style={styles.containerQuestion} >
                                <Text style={styles.txtContinue} >Proxima Fase</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableWithoutFeedback onPress={this.props.onCancel} style={styles.background}>
                    <View  style={styles.background} >
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
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
    containerQuestion: {
        flex: 0,
        marginHorizontal: 10
        
    },
    txtContinue: {
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