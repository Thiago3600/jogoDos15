import React, {useState, Component}from 'react'
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, ToastAndroid} from 'react-native'
import AsyncStorage from "@react-native-community/async-storage"
import 'react-native-gesture-handler';
import ChoseColor from '../components/ChoseColor'
import commonStyles from '../commonStyles'



export default props => {


    const [state, setState] = useState({
        showScreen: false,
        color: ''
    })

    const [user, setUser] = useState({
        name: 'Sem nome',
    })
    const [save, setSave] = useState({
        firstRetrieve: false,
    })

    function alterarCor(cor, action){
        if (typeof cor === 'string') {
            if(action === 'borderBox'){
                console.log(cor)
                //commonStyles.configBox.borderBox = cor
            }
        }
    }

    const _storeData = async (user) => {

        const userString = JSON.stringify(user)
        //console.log(`stateStringSave: ${stateString}`)
        try {
          await AsyncStorage.setItem('userString', userString);
          return true
        } catch (error) {
          // Error saving data
          return false
        }
      };
      const _retrieveData = async () => {
        //console.log(`We have data?`)
        try {
          const stateSave = await AsyncStorage.getItem('userString');
          if (stateSave !== null && !save.firstRetrieve ) {
            // We have data!!
            console.log(`We have data! user: ${stateSave}`)
            const state = JSON.parse(stateSave)
            setUser(state)
            setSave({firstRetrieve: true})
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }

        return state
      };

      _retrieveData()
    
    return(
        <View style={styles.container}>
            <ChoseColor isVisible={state.showScreen} color={state.color} alterColor={alterarCor} onCancel={() => setState({showScreen: false})} />
            <Text style={styles.tituloConfig}>Configurações Gerais</Text>
            <View style={styles.containerRow}>
                <Text style={styles.info}> Nome: </Text>
                <TextInput
                    style={styles.info}
                    onChangeText={nome => setUser({nome: nome })}
                    maxLength={17}
                    value={user.nome}
                    placeholder='Digite seu nome'
                        />
            </View>
           <View style={styles.containerRow} >
               <Text style={styles.info} >Cor da caixa | </Text>
               <TouchableOpacity style={styles.boxBorder} onPress={() => {
                   setState({showScreen: true, color: commonStyles.configBox.borderBox})
               }} ></TouchableOpacity>
               <TouchableOpacity style={styles.boxInside} onPress={() => {
                   setState({showScreen: true, color: commonStyles.configBox.borderBox})
               }} ></TouchableOpacity>
           </View>


           <View style={styles.containerRow} >
               <Text style={styles.info}>Cor da bloco | </Text>
               <TouchableOpacity style={styles.blocoBorder} onPress={() => {
                   setState({showScreen: true, color: commonStyles.configBox.borderBox})
               }} ></TouchableOpacity>
               <TouchableOpacity style={styles.blocoInside} onPress={() => {
                   setState({showScreen: true, color: commonStyles.configBox.borderBox})
               }} ></TouchableOpacity>
           </View>

           <View style={styles.containerAction} >
                <TouchableOpacity style={styles.buttons} activeOpacity={0.5} >
                    <View>
                        <Text style={styles.fontOptions} >Cancelar</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttons} onPress={() => {

                    console.log(JSON.stringify(props.route))
                    if(_storeData(user)){
                        ToastAndroid.show("Save complete", ToastAndroid.SHORT);
                    }else{
                        ToastAndroid.show("Not save", ToastAndroid.SHORT);
                    }
                }}activeOpacity={0.5} >
                    <View>
                        <Text  style={styles.fontOptions}>Salvar</Text>
                    </View>
                </TouchableOpacity>
           </View>

           
            
        </View>
    )

}


const styles = StyleSheet.create({
    container:{
        flex: 1,
        margin: 0,
        backgroundColor: commonStyles.configMenu.backgroundColor,
        justifyContent: 'flex-start',
        padding: 20,
        
    },
    containerAction:{
        flex: 0,
        margin: 0,
        flexDirection: 'row',
        backgroundColor: commonStyles.configMenu.backgroundColor,
        justifyContent: 'center',
        padding: 20,
     
        
    },
    containerRow:{
        flex: 0,
        flexDirection: 'row',
        margin: 0,
        backgroundColor: commonStyles.configMenu.backgroundColor,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: 'white',
        padding: 0,
        paddingHorizontal: 2,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttons:{
        backgroundColor: 'white',
        borderColor: 'black',
        borderWidth: 4,
        borderRadius: 15,
        marginVertical: '1%',
        marginHorizontal: '1%',
        padding: 10
    },
    fontOptions: {
        fontSize: 26,
    },
    tituloConfig:{
        borderColor: 'black',
        borderWidth: 4,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15,
        fontSize: 26,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    info:{
        fontSize: 20,
        textAlign: 'left',
        textAlignVertical: 'center',
    },
    boxBorder:{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        backgroundColor: commonStyles.configBox.borderBox,
    },
    boxInside:{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        backgroundColor: commonStyles.configBox.insideBox,
    },
    blocoInside:{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        margin: 5,
        backgroundColor: commonStyles.configBloco.insideBox,
    },
    blocoBorder:{
        width: 40,
        height: 40,
        borderWidth: 1,
        borderColor: commonStyles.configBloco.borderBox,
        margin: 5,
        backgroundColor: commonStyles.configBloco.borderBox,
    }
})