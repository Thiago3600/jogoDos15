import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'


export default props => {

    let params = null

    if(props.params !== undefined)params = props.params

    return(
        <View style={styles.container}>
            {props.avancar ?props.navigation.navigate(props.avancar, params):false}
            {console.log(`params ${params}`)}
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    textContainer: {
        fontSize: 50,
        color:'#FFF',
    }
})