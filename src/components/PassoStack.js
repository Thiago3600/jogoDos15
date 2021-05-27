import React, {useState} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native'





export default props => {

    const params = props.params

    
   //console.log(props.params('check'))


    return(
        <View style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                {props.params && props.params('check') ?props.navigation.navigate(params('screen'), params('newGame')):false}
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