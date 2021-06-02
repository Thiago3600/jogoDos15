import React, {createContext, useReducer} from 'react'
import AsyncStorage from "@react-native-community/async-storage"
import stateGame, {setStateBlocos,setInitialStateObj} from '../data/stateGame'

const initialState = {stateGame}
const GameContext = createContext({})


export const GameProvider = props => {

    const _storeData = async (state) => {

        const stateString = JSON.stringify(state)
        //console.log(`stateStringSave: ${stateString}`)
        try {
          await AsyncStorage.setItem('stateString', stateString);
        } catch (error) {
          // Error saving data
        }
      };

      const _retrieveData = async () => {
        console.log(`We have data?`)
        try {
          const stateSave = await AsyncStorage.getItem('stateString');
          if (stateSave !== null) {
            // We have data!!
            console.log(`We have data!: ${stateSave}`)
            const state = JSON.parse(stateSave)
            setInitialStateObj(state)
            
          }
        } catch (error) {
          // Error retrieving data
          console.log(error)
        }
      };


    const actions = {
        
    }

    
    
    function reducer(state, action){
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }
    
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <GameContext.Provider value={{state, dispatch }}>
            {props.children}
        </GameContext.Provider>
    )
}

export default GameContext