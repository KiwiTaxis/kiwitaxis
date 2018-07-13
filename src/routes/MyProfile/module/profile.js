import update from "react-addons-update";

import {Dimensions} from "react-native";
import RNGooglePlaces from 'react-native-google-places';
import request from '../../../util/request';
import AsyncStorage from 'react-native';
import constants from './actionConstants'

/* declaring values as constants */


const {GET_PROFILE} =  constants;

        export function getUserProfile(payload){
            Promise.resolve(payload).then(function(token){
          
            return(dispatch)=>{

               request.post('http://54.252.173.49/api/passenger/getProfile')
               .send({
                   api_token:token
               }).finish((error,res)=>{
                console.log(res);
                dispatch({
                    type:"GET_PROFILE",
                    payload:res
                })
               })
            }
        })
    }
                
           
        
        function handleGetProfile(state,action){
            console.log(action.payload);
            return update(state,{
                profile :{
                   
                   $set:action.payload
                
                   }
                 
                   })
        }
         const ACTION_HANDLERS = {
                GET_PROFILE : handleGetProfile
            
             };
 
            const initialState ={
            profile :{}
            
            }


export function ProfileReducer (state =initialState,action){
const handler = ACTION_HANDLERS[action.type]
return handler ? handler(state,action) : state;
}
