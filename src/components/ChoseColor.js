import React, {useState} from 'react';
import {View, Text, Modal, StyleSheet, TouchableWithoutFeedback, TouchableOpacity, TextInput} from 'react-native'


export default props => {

    const [chose, setChose] = useState(props.color)
    
    const cor =[ 
        '#9400FF',
        '#1701FF',
        '#00ACFF',
        '#00E827',
        '#FFFF00',
        '#FF7A00',
        '#FF0101',
        'black',
        'white',
        'gray'
    ]
    

    function getCores(){
        return cor.map(cor => <TouchableOpacity onPress={() => props.alterColor(cor, 'borderBox')} style={[ styles.quadrado ,{backgroundColor: cor}]}>

                             </TouchableOpacity>)
    }


    return(
        <Modal transparent={true} visible={props.isVisible} onRequestClose={props.onCancel} animationType='fade'>
            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View  style={styles.background} >
                </View>
            </TouchableWithoutFeedback>

            <View style={styles.containerRow} >
                <TouchableWithoutFeedback onPress={props.onCancel} >
                    <View  style={styles.backgroundRow} >
                    </View>
                </TouchableWithoutFeedback>
                    <View style={styles.container} >

                        <Text style={styles.text} >Selecione um cor:</Text>

                        {getCores()}    
                        
                    </View>
                <TouchableWithoutFeedback onPress={props.onCancel}>
                    <View  style={styles.backgroundRow} >
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <TouchableWithoutFeedback onPress={props.onCancel}>
                <View  style={styles.background} >
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 5,
        height: '100%',
        width: '100%',
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: 'black',
        backgroundColor: 'white',
        padding: 30,
        borderRadius: 10,
    },
    text:{
        fontSize: 24,
        textAlign: 'center',
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: '5%',
        alignItems: 'center',
        justifyContent: 'center',

        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    background:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    backgroundRow:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    quadrado:{
        width: '15%',
        height: '15%',
        margin: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 8
    }
})