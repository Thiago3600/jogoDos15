import React, { Component, useContext, useState, useEffect, Fragment } from 'react'
import ReactNative, { View, Text, StyleSheet, Dimensions, findNodeHandle, SafeAreaView,} from 'react-native'
import Bloco from './Blocos'
export default class Grade extends Component {



    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})