import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import RNGooglePlaces from 'react-native-google-places';
import request from '../../../util/request';
import AsyncStorage from 'react-native';
import io from 'socket.io-client'



let socket = io('http://54.252.173.49:6001');


/* declaring values as constants */
                    
const { GET_NOTIFACTION }= constants;





        export function getSocketData(){
            return(dispatch)=>{
                socket.on('driverChannel:request_trip_8b719a90-3c51-11e8-803b-eb1d59c84872', (data) => {
                    console.log('GetDataDone');
                    //console.log(state.home.requestreceived);
                    store.dispatch({
                        type:'GET_NOTIFACTION',
                        payload:data});
                    });
                }
            }
                function ApiGotData(state,action){
                    return update(state,{
                        requestreceived:{
                            $set : action.payload
                    }
                
                })

            }
            const ACTION_HANDLERS = {
                GET_NOTIFACTION : ApiGotData
             };
 
const initialState ={
  
 requestreceived :{}
}


export function NotificationReducer (state =initialState,action){
const handler = ACTION_HANDLERS[action.type]
return handler ? handler(state,action) : state;
}
