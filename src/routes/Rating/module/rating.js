import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import RNGooglePlaces from 'react-native-google-places';
import request from '../../../util/request';
import AsyncStorage from 'react-native';
import io from 'socket.io-client'
import {Actions} from 'react-native-router-flux'




/* declaring values as constants */
                    
const { GET_RATING,GET_ONLINE_STATUS }= constants;
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0104;
const LONGITUDE_DELTA = 0.10;



// actions to be performed


//actions (actions has two properties  :- dispatch(that is when the state change happens then its dispatched to the reducer and then to store) , payload(return type)) 

//get current location
        export function getRating(){
            return(dispatch)=>{
                navigator.geolocation.getCurrentPosition(
                    (position)=>{
                        dispatch({
                            type:GET_RATING,
                            payload:position
                        });
                    },
                    (error)=> console.log(error.message),
                    {enableHighAccuracy: false, timeout: 20000}
                );
            }
        }
 
    function handleGetRating(state,action)
            {  
                return update(state, 
                {
                    rating:{
                    $set: true
                    },

            })
        
    }
               const ACTION_HANDLERS = {
                GET_RATING : handleGetRating,
                  };
    
    const initialState ={
        rating :{}
    }

export function RatingReducer (state =initialState,action){
const handler = ACTION_HANDLERS[action.type]
return handler ? handler(state,action) : state;
}
