import React, {useState, Component} from 'react'
import {View , Text, StyleSheet, Image, Modal } from 'react-native'
import Blocos from '../components/Blocos'
import AsyncStorage from '@react-native-community/async-storage'
import WinGame from '../screens/win'
import InsertName from '../screens/insertName'
import commonStyles from '../commonStyles'

export default props => {

    const [state, setState] = useState({
        numPress: null,
        blocos: [],
        linhas: 4,
        colunas: 4,
        numGerado: false,
        width: null,
        height: null,
        sizeFont: 26
    })

    const [win_game, setWinGame] = useState({
        showScreen: false,
        newGame: props.route.params
    })

    const [fase, setFase] = useState({
        fase: state.linhas - 3,
    })

    const [info, setInfo] = useState({
        score: 0,
        showScreen: false
    })

    const [save, setSave] = useState({
        firstRetrieve: false,
    })

    const [user, setUser] = useState({
        nome: 'Sem nome',
    })

    const _storeData = async (state) => {

        // console.log(`stateSave: ${state}`)
        const stateString = JSON.stringify(state)
        // console.log(`stateStringSave: ${stateString}`)
        try {
            await AsyncStorage.setItem('stateString', stateString);
        } catch (error) {
          // Error saving data
        }
      };
      const _retrieveData = async () => {
        // console.log(`We have data?`)
        try {
          const stateSave = await AsyncStorage.getItem('stateString');
          const userSave = await AsyncStorage.getItem('userString');
          if (stateSave !== null) {
            // We have data!!
            // console.log(`We have data!: ${stateSave}`)
            const save = JSON.parse(stateSave)
            setDados(save)
          }
          if (userSave !== null) {
            // We have data!!
            // console.log(`We have data!: ${stateSave}`)
            const user = JSON.parse(userSave)
            setUser(user)
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
      };

      const _retrieveUser = async () => {
        // console.log(`We have data?`)
        try {
          const userSave = await AsyncStorage.getItem('userString');
          if (userSave !== null && !save.firstRetrieve) {
            // We have data!!
            //console.log(`We have data! userGame: ${userSave}`)
            const user = JSON.parse(userSave)
            setUser(user)
            setSave({firstRetrieve: true})
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
      };

    function find_dimesions(layout){
        const {x, y, width, height} = layout; 
  
        setDados({width: width, height: height});
    }

    function getRandNumber(min, max){
        let aleatorio = Math.random() * (max - min) + min
        return aleatorio.toFixed(0)
    }
    
    function getRandNumberUniques(nums){
        const novo = getRandNumber(1, state.linhas * state.colunas)
        return nums.includes(novo) ? getRandNumberUniques(nums) : novo
    }

    function numPressionado(num){
        
        const checkNumber = number => number === num
        let blocos = state.blocos
        let blocoSelecionadoIndex = blocos.findIndex(checkNumber)
        let blocoVazioIndex = blocos.findIndex(n => n == state.blocos.length)
        let linhaAtualSelecionada = Math.floor((blocoSelecionadoIndex/state.linhas))
        let linhaAtualBlVazio = Math.floor((blocoVazioIndex/state.linhas))

        let colunaAtualSelecionada = Math.floor((blocoSelecionadoIndex%state.colunas))
        let colunaAtualBlVazio = Math.floor((blocoVazioIndex%state.colunas))

        // console.log(`colunaAtualSelecionada: ${colunaAtualSelecionada}`)
        // console.log(`colunaAtualBlVazio: ${colunaAtualBlVazio}`)

        

        if (blocoSelecionadoIndex === blocoVazioIndex + state.linhas ||
            blocoSelecionadoIndex === blocoVazioIndex - state.colunas || 
            (blocoSelecionadoIndex === blocoVazioIndex + 1 || 
                blocoSelecionadoIndex === blocoVazioIndex - 1) && 
                linhaAtualBlVazio == linhaAtualSelecionada ) {
            

            blocos[blocoVazioIndex] = state.blocos[blocoSelecionadoIndex]
            blocos[blocoSelecionadoIndex] = state.blocos.length
        } else {

            if(linhaAtualBlVazio == linhaAtualSelecionada){
                console.log("Mesma Linha")
            }else if(colunaAtualSelecionada == colunaAtualBlVazio){
                console.log("Mesma coluna")
            }

            
            
            
        }
        
        won()
        

        setDados({ blocos: blocos, numPress: num})
    }

    function toggleNumGerado(){
        setDados({numGerado: !numGerado});
    }

    function setDados(estado){
        // console.log(`JSONStrSetestado ${JSON.stringify(estado)}`)

        // console.log(`typeof numGerado: ${typeof estado.numGerado} = ${estado.numGerado}`)

        // if(typeof estado.numGerado === 'boolean'){
        //     console.log(`É boolean typeof numGerado: ${typeof estado.numGerado} = ${estado.numGerado}`)
        //     setState({numGerado: estado.numGerado})
        // }else{
        //     console.log(`Não é boolean typeof numGerado: ${typeof estado.numGerado} = ${estado.numGerado}`)
        // }

        setState({
            numPress: estado.numPress || state.numPress,
            blocos: estado.blocos || state.blocos,
            linhas: estado.linhas || state.linhas,
            colunas: estado.colunas || state.colunas,
            numGerado: typeof estado.numGerado === 'boolean' ? estado.numGerado : state.numGerado,
            width: estado.width || state.width,
            height: estado.height || state.height,
            sizeFont: estado.sizeFont || state.sizeFont,
        })
            
        let dados = JSON.stringify(state)
        // console.log(`JSONStrSetDados ${dados}`)
        _storeData(state)
    }

    function dispatch(action){

        if(action.type === 'qtdBlocos'){
            return state.linhas * state.colunas
        }
        if(action.type === 'blocosNumeros'){

            if(!state.numGerado){
                //console.log("Ó eu aqui")
                //const blocosNumeros = new Array(state.linhas * state.colunas).fill(0).map((value, i) => value = i + 1)
                //console.log(`Ó eu aqui: ${blocosNumeros}`)
                const blocosNumeros = new Array(state.linhas * state.colunas).fill(0).reduce(n => [...n, getRandNumberUniques(n)], [])
                setDados({ blocos: blocosNumeros , numGerado: true})
            }
            return state.blocos
        }
        if(action.type === 'numPressionado'){
            const num = action.payload
            numPressionado(num)
        }
        if(action.type === 'dimensionBlock'){
            return {
                width: (state.width / state.linhas) - 1,
                height: (state.height / state.colunas)
            }
        }
        return 
    }

    function proximaFase(){

        let estado = state

        estado.linhas = estado.linhas + 1
        estado.colunas = estado.colunas + 1
        setDados(estado)
        const blocosNumeros = new Array(state.linhas * state.colunas).fill(0).reduce(n => [...n, getRandNumberUniques(n)], [])
        console.log(`Ó eu aqui proximaFase: ${blocosNumeros}`)
        setDados({ blocos: blocosNumeros , numGerado: true})
        setWinGame({showScreen: false})       
    }

    function won(){
        const blocosNumeros = state.blocos

        let stop = true

        for (let index = 0; index < blocosNumeros.length; index++) {
            //console.log(`bloco[${index}]: ${blocosNumeros[index]} || bloco[${index + 1}]: ${blocosNumeros[index + 1]}`)
            if ( Number.parseInt(blocosNumeros[index]) > Number.parseInt(blocosNumeros[index + 1])) {
                //console.log(`bloco[${index}]: ${blocosNumeros[index]} > bloco[${index + 1}]: ${blocosNumeros[index + 1]}`)
                stop = false
                break
            }
        }
        
        if(stop){
            setWinGame({showScreen: stop, newGame: true})
            //setInfo({fase: info.fase+1})
            // console.log(`NumGerado antes ${state.numGerado}`)
            // setDados({linhas: state.linhas + 1, colunas: state.colunas + 1, numGerado: false})
            // console.log(`NumGerado depois ${state.numGerado}`)
        }

        //console.log(blocosNumeros)
        return stop
    }
      
    function setNome (nome){
        console.log(nome)
        setInfo({nome: nome, showScreen: false})
    }   
    
    function setInfos(information){

        const estado = info

        if(information.nome)estado.nome = information.nome
        if(information.fase)estado.fase = information.fase
        if(information.showScreen)estado.showScreen = information.showScreen

        setInfo(...estado)
        
    }
    


    
    if(!win_game.newGame && !state.numGerado){
        _retrieveData()
    }


    _retrieveUser()

    
    
    return (
        <View style={styles.container}>
            <WinGame isVisible={win_game.showScreen} onCancel={() => setWinGame({showScreen: false})} proxFase={proximaFase} />
            <InsertName isVisible={info.showScreen} onCancel={() => setInfo({showScreen: false})} setName={setNome} />
            <View style={styles.boxInfo}>
                <View style={styles.boxImgPerfil}>
                    <View style={styles.borderImgPerfil}>
                        <Image
                            style={styles.imgPerfil}
                            source={require('../assets/avatar.png')}    
                        />
                    </View>
                </View>
                <View style={styles.boxInfoPerfil}>
                    <Text style={styles.fontInfoPerfil}>{user.nome}</Text>
                    <Text style={styles.fontInfoPerfil}>Fase: {fase.fase}</Text>
                    <Text style={styles.fontInfoPerfil}>Pontuação: 000</Text>
                </View>
            </View>
            <View style={styles.boxFora}>
                <View style={styles.boxDentro} onLayout={(event) => {find_dimesions(event.nativeEvent.layout) }} >
                    <Blocos funcao={dispatch} />
                </View>
            </View>
        </View>

    )
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    boxImgPerfil:{
        flex: 1,
        padding: 10,
    },
    borderImgPerfil:{
        borderWidth: 1,
        borderColor: 'black',
        margin: 0,
        padding: 0,

    },
    imgPerfil:{
        width: '100%',
        height: '90%',
        resizeMode: 'contain',
    },
    boxInfoPerfil:{
        flex: 2,
        borderWidth: 1,
        borderColor: 'black',
        justifyContent: 'center',
        paddingHorizontal: 15
    },
    fontInfoPerfil:{
        fontSize: 25,
        borderColor: 'black',
        borderWidth: 1,
        padding: 5,

    },
    boxInfo:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 20,
        borderWidth: 1,
        borderColor: 'black',
    },
    boxFora:{
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: '60%',
        backgroundColor: commonStyles.configBox.borderBox,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 5
    },
    boxDentro:{
        margin: 0,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: 'black',
        width: '100%',
        height: '100%',
        backgroundColor: commonStyles.configBox.insideBox,
        borderRadius: 0
    }
})