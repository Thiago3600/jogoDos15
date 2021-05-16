import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'


export default props => {


        return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {props.avancar?props.navigation.navigate(props.avancar):false}
            </View>
            <View style={styles.container}>
                {props.children}
            </View>
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