import update from "react-addons-update";
import constants from "./actionConstants";
import {Dimensions} from "react-native";
import RNGooglePlaces from 'react-native-google-places';
import request from '../../../util/request';
import AsyncStorage from 'react-native';
import io from 'socket.io-client'
import {Actions} from 'react-native-router-flux'




/* declaring values as constants */
                    
const { GET_CURRENT_LOCATION,GET_ONLINE_STATUS }= constants;
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0104;
const LONGITUDE_DELTA = 0.10;



// actions to be performed


//actions (actions has two properties  :- dispatch(that is when the state change happens then its dispatched to the reducer and then to store) , payload(return type)) 

//get current location
        export function getCurrentLocation(){
            return(dispatch)=>{
                navigator.geolocation.getCurrentPosition(
                    (position)=>{
                        dispatch({
                            type:GET_CURRENT_LOCATION,
                            payload:position
                        });
                    },
                    (error)=> console.log(error.message),
                    {enableHighAccuracy: false, timeout: 20000}
                );
            }
        }

        export function getloginstatus(payload)
        {
           try{
               var token  = AsyncStorage.getItem('token')
               console.log(token)
        }catch(error){
            console.log(error);
        }
          return{
              type :"GET_LOGIN_STATUS",
              payload 
            }
        }
            export function getInputData(payload){
                return{
                    type:"GET_USER_INPUT",
                    payload

                }

            }
                    export function getAddressPrediction()
                    {
                       return(dispatch,store) =>
                       {
                           let userinput = store().home.inputtype.pickup ? store().home.inputData.pickup : store().home.inputData.dropoff
                           
                        RNGooglePlaces.getAutocompletePredictions(userinput,{
                                country :'nz'
                        }).then((result)=>

                        dispatch({
                            type:"GET_ADDRESS_PREDICTION",
                            payload:result,
                        })
                        
                        )

                       }

                }

                export function identifyInput(payload){
                    return{
                        type: "INPUT_TYPE",
                        payload
                    }
                }
                export function getSelectedItem(payload){
                   return(dispatch,store)=>
                   {
                       let input = payload
                        RNGooglePlaces.lookUpPlaceByID(input)
                        .then((result) =>dispatch({
                            type:"GET_SELECTED_ITEM",
                            payload:result
                        })
                    )
                    .then((results)=>{
                   
                        request.get("https://maps.googleapis.com/maps/api/directions/json")
                        .query({
                           
                            origin: store().home.region.latitude  + "," +  store().home.region.longitude,
                            destination: store().home.selecteditem.latitude  + "," +  store().home.selecteditem.longitude,
                            mode: "driving",
                            key:"AIzaSyBWke_00RksOBNheCG6v3HSeF8UsGyZQus"
                        })
                        .finish((error, res)=>{
                            console.log(error);
                            dispatch({
                                type:"GET_DISTANCE_TIME",
                                payload: res.body
                            })
                            setTimeout(function(){
                                
                                      var polyline = store().home.distancetimepolyline.routes[0].overview_polyline.points;
                                    
                                      var points = [ ];
                                        var index = 0, len = polyline.length;
                                        console.log(len)
                                        var lat = 0, lng = 0;
                                        while (index < len) {
                                            var b, shift = 0, result = 0;
                                            do {
                                              
                                                  b = polyline.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                                                  result |= (b & 0x1f) << shift;
                                                  shift += 5;
                                                 } while (b >= 0x20);
                                    
                                    
                                           var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                                           lat += dlat;
                                          shift = 0;
                                          result = 0;
                                         do {
                                            b = polyline.charAt(index++).charCodeAt(0) - 63;
                                            result |= (b & 0x1f) << shift;
                                           shift += 5;
                                             } while (b >= 0x20);
                                         var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                                         lng += dlng;
                                     
                                       points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})  
                                       
                                       }
                                       dispatch({
                                            type:"GET_POLYLINE",
                                            payload:points

                                       })
                                      
                                      
                                    var distance = store().home.distancetimepolyline.routes[0].legs[0].distance.value;
                                    var duration = store().home.distancetimepolyline.routes[0].legs[0].duration.value;
                                    var _distance_in_km = distance /1000;
                                    var _duration = duration / 60;
                                    const baseCharge= 1.40, _distance=1.60,_timecharges=0.30,_surge=5.00;
                                    const distance_charges = baseCharge *  _distance_in_km;
                                    const time_charges = _timecharges * _duration;
                                    const minimum = 5.00;
                                    const finalfare = baseCharge + distance_charges + time_charges + minimum;
                                       dispatch({
                                        type: "GET_FARE",
                                        payload:{finalfare,_distance_in_km,_duration},
    
                                            
                                       })
                                    }, 2000);
                              //console.log(res);
                        })
                    }),(error) => console.log(error.message);
                    
                    }
                }
                
                
                  //action handlers 
                function handleGetCurrentLocation(state, action){
                   //to zoom in the map 
                    const oneDegreeOfLongitudeInMeters = 111.32 * 500;
                    const circumference = (40075 / 360) * 1000;
                
                    const latDelta = action.payload.coords.accuracy * (1 / (Math.cos(action.payload.coords.latitude) * circumference));
                    const lonDelta = (action.payload.coords.accuracy / oneDegreeOfLongitudeInMeters);

                return update(state, {
                region:{
                    latitude:{
                        $set:action.payload.coords.latitude
                    },
                    longitude:{
                        $set:action.payload.coords.longitude
                    },
                    latitudeDelta:{
                        $set:latDelta
                    },
                    longitudeDelta:{
                        $set:lonDelta
                    }
                }
            })
        }
         function handleGetLogin(state,action){
           //  console.log()
           return update(state,{
                token:{
                    $set : action.payload
                },

                loggedin:{
                    $set :true
                }  
                })
         }

         export function getNearbyDrivers(payload){
            return(dispatch,store)=>{
                request.post('http://54.252.173.49/api/passenger/login')
                .query({
                        email : store().register.username,
                        password:  store().register.password
                  })
                  .finish((error, res)=>{
                      console.log(error)
                  dispatch({
                   type: "GET_LOGIN_CREDENTIALS",
                   payload: res,
            })
        })
    }
} 



                export function getonlineStatus(payload){
                    console.log(payload);
                 var token = Promise.resolve(payload.token)
                  console.log(token);
                    return(dispatch,store)=>{
                      
                           
                        if(payload.value == "online"){
                            Promise.resolve(payload.token).then(function(values) {
                                
                                updatelocation();
                      function updatelocation(){
                        request.post('http://54.252.173.49/api/driver/updateLocation')
                        .send({

                                
                                latitude : JSON.stringify(store().home.region.latitude),
                                longitude:  JSON.stringify(store().home.region.longitude),
                                api_token: values
                          })
                          .finish((error, res)=>{
                              console.log(res)
                          dispatch({
                           type: "GET_ONLINE_STATUS",
                           payload
                    })
                })
            }


            });
        
        
            }else if(payload.value == "offline"){
                Promise.resolve(payload.token).then(function(values) {
                  request.post('http://54.252.173.49/api/driver/goOffline')
                  .send({
                          api_token: values
                    })
                    .finish((error, res)=>{
                        console.log(res)
                    dispatch({
                     type: "GET_ONLINE_STATUS",
                     payload
              })
          })
      })
    }
    }
}
                
        
          //also open socket connection  or emit socket
               
               function handleGetOnlineStatus(state,action){
                    if(action.payload.value =="online"){
                    return update(state,{
                        online :{  
                            $set:true
                        }
                        })
                    }
                    else{
                        return update(state,{
                            online :{  
                                $set:false
                            }
                            })

                    }

                    }

                





          

         
        function handleGetInputData(state, action){
            const{key,value} = action.payload;
            return update(state, {
              inputData:{
                  [key]:{
                      $set:value
                  }
              }
            })
        }

        function handleGetAdressPrediction(state,action){
       console.log(action.payload)
      if(action.payload.length != 0)
            {return update(state, {
               
              predictions:{
                $set:action.payload
              },
              isloading:{
                $set : false
            }
            })
        }else
              {
                  console.log("checked length");
                  return update(state,{
                    selecteditem:
                    {
                        $set:{}
                        
                    },
                    predictions:{
                        $set:{}
                    }
                    
                  })
              }
            }
            

            function handleInputType(state,action){
               if(action.payload === "pickup")
                return update(state,{
                    inputtype:{
                    pickup:{
                        $set:true,
                    },
                    dropoff:{
                        $set:false
                    },
                    predictions :{
                        $set : {}
                    }
                    
                }
                })
                if(action.payload === "dropoff")
                return update(state,{
                    inputtype:{
                        pickup:{
                            $set:false,
                        },
                        dropoff:{
                            $set:true
                        },
                        predictions :{
                            $set : {}
                        }
                      
                        
                    }
                    })
                    if(action.value = " ")
                    { return update(state,{
                        inputtype:{
                            pickup:{
                                $set:false,
                            },
                            dropoff:{
                                $set:true
                            },
                            predictions :{
                                $set : {}
                            }
                          
                            
                        }
                        })
                        
                        
                    }
            }
            function handleGetSelectedItem(state,action){
                return update(state,{
                    selecteditem :{
                        $set :action.payload,
                        
                    },
                    predictions:{
                        $set :{}
                    },
                    inputtype:{
                        $set :{}
                    }
                    
                })
                          
            }


          


             function handlePredictedValue(state,action)
                {
                    return update(state,{
                        selectedaddress:{
                            $set : action.payload
                        }


                    })
                }

                function handleGetDistanceTime(state,action){
                    return update(state,{
                        distancetimepolyline:{
                            $set: action.payload
                        }
                      
                    })


                }

                function handleGetPolyline(state,action){
                    return update(state,{

                    points:{
                        $set : action.payload
                    },
                    requestreceived:{
                        $set:undefined
                    }   
                                       
                    })
                }
            function handleGetFare(state,action){
                const farecharges = Math.floor(action.payload.finalfare);
                const minimum = farecharges - 10;
                const distance = action.payload._distance_in_km;
                const duration = action.payload._duration;
                console.log(distance);
                return update(state,{
                 minimum:{
                     $set:{minimum}
                 },
                 maximum:{
                     $set:{farecharges}
                 },
                duration:{
                    $set:{duration}
                },
                distance:{
                    $set:{distance}
                }
                    
                })
               }
               function handleGetLoadingPending(state,action){
                   return update(state,{
                       isloading:{
                           $set: action.payload
                       }
                   })
               }
               
        export function getSocketData(payload){
            return(dispatch,store)=>{
                     dispatch({
                        type:'GET_NOTIFACTION',
                        payload});
                    }
                
                }   
            
                function ApiGotData(state,action){
                    return update(state,{
                        requestreceived:{
                            $set : action.payload
                    },
                    newrequest:{
                        $set: action.payload
                    }
                
                })

            }
            export function getDriverRequest(payload,token)
            { 
                console.log(token);
                const api_token = token;
                const operation = JSON.stringify(payload);
                return(dispatch,store)=>{
                    request.post('http://54.252.173.49/api/driver/responseOrder')
                    .query({
                            trip_request_id : store().home.newrequest.trip_request_id,
                            op:  payload,
                            api_token : api_token
                      })
                      .finish((error, res)=>{
                        console.log (res.text.errMsg); 
                      if(res && payload === "accept")
                      { 
                          dispatch({
                        type:"GET_DRIVER_RESPONSE",
                        payload: res.body.data.trip_id
                    })
                       
                          let src_lat = store().home.newrequest.src.latitude;
                          let src_lng = store().home.newrequest.src.longitude;
                          let dst_lat = store().home.newrequest.dest.latitude;
                          let dst_lng = store().home.newrequest.dest.longitude;

                          request.get("https://maps.googleapis.com/maps/api/directions/json")
                          .query({
                             
                              origin: store().home.region.latitude  + "," +  store().home.region.longitude,
                              destination: store().home.newrequest.src.latitude  + "," +  store().home.newrequest.src.longitude,
                              mode: "driving",
                              key:"AIzaSyBWke_00RksOBNheCG6v3HSeF8UsGyZQus"
                          })
                          .finish((error, res)=>{
                              console.log(res);
                              dispatch({
                                type:"GET_DISTANCE_TIME",
                                payload: res.body
                            })
                             
                              setTimeout(function(){
                                  
                                        var polyline = store().home.distancetimepolyline.routes[0].overview_polyline.points;
                                      
                                        var points = [ ];
                                          var index = 0, len = polyline.length;
                                          console.log(len)
                                          var lat = 0, lng = 0;
                                          while (index < len) {
                                              var b, shift = 0, result = 0;
                                              do {
                                                
                                                    b = polyline.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                                                    result |= (b & 0x1f) << shift;
                                                    shift += 5;
                                                   } while (b >= 0x20);
                                      
                                      
                                             var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                                             lat += dlat;
                                            shift = 0;
                                            result = 0;
                                           do {
                                              b = polyline.charAt(index++).charCodeAt(0) - 63;
                                              result |= (b & 0x1f) << shift;
                                             shift += 5;
                                               } while (b >= 0x20);
                                           var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                                           lng += dlng;
                                       
                                         points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})  
                                         
                                         }
                                         dispatch({
                                            type:"GET_POLYLINE",
                                            payload:points
                            
                                    },2000)
                                  

                                   })
                                }) 
                         
            }else{
                request.post('http://54.252.173.49/api/driver/responseOrder')
                .query({
                        trip_request_id : store().home.newrequest.trip_request_id,
                        op:  payload,
                        api_token : api_token
                  })
                  .finish((error, res)=>{
                    console.log (res.text.errMsg); 


                dispatch({
                    type: "GET_DRIVER_RESPONSE",
                    payload
                })
            })
                }
            })
        }
    }


    function handleGetDistanceTime(state,action){
        return update(state,{
            distancetimepolyline:{
                $set: action.payload
            },
           
          
        })


    }
            function handleGetDriverequest(state,action){
                const erro = action.payload;
                console.log(erro);
                if(action.payload === "refuse")
               {
                return update(state,{
                    requestaccepted:{
                        $set:false
                    },
                  
                    trip_id:{
                        $set:{}
                    },
                    requestreceived:{
                        $set: false
                    }
                })
            }else{
                return update(state,{
                    requestaccepted:{
                        $set:true
                    },
                  
                    trip_id:{
                        $set:action.payload
                    }
                })
            }
        }
          
            export function logout(payload)
            {
                console.log(payload);
            return(dispatch,store)=>{
                Promise.resolve(payload).then(function(values) {
                request.post('http://54.252.173.49/api/driver/logout')
                .query({
                        api_token : values
                  })
                  .finish((error, res)=>{
                    console.log (res); 
                  if(res.body.errMsg === "success")
                  { dispatch({
                    type:"LOGOUT_USER",
                    payload: "logged out"
                })
            }else{

            }
                
            })
        
            })
        
        
        }
    }
    function handlelogout(state,action){
        if(action.payload === "logged out")
        return update(state,{
            loggedout:{
                $set:true
            },
            loggedin :{
                $set : false
            }

          
          
        })
    }
    export function cancelRequest(){
        return(dispatch,store)=>{
            dispatch({
                type:"CANCEL_REQUEST",
                
            })
        }
    }
    function handleCancelrequest(state,action){
        return update(state,{
            requestaccepted:{
                $set : false
            },
            requestreceived:{
                $set:false
            }
           
        })

    }
               
            
               

            const ACTION_HANDLERS = {
                GET_CURRENT_LOCATION : handleGetCurrentLocation,
                INPUT_TYPE : handleInputType,
                GET_USER_INPUT : handleGetInputData,
                GET_ADDRESS_PREDICTION : handleGetAdressPrediction,
                GET_SELECTED_ITEM : handleGetSelectedItem,
                GET_PREDICTED_VALUE : handlePredictedValue,
                GET_DISTANCE_TIME : handleGetDistanceTime,
                GET_POLYLINE : handleGetPolyline,
                GET_FARE : handleGetFare,
                LOADING_PENDING : handleGetLoadingPending,
                GET_ONLINE_STATUS : handleGetOnlineStatus,
                GET_NOTIFACTION : ApiGotData,
                GET_DRIVER_RESPONSE:  handleGetDriverequest,
                LOGOUT_USER: handlelogout,
                CANCEL_REQUEST:handleCancelrequest
                };
    
    const initialState ={
    region :{},
    inputData:{},
    inputtype :{},
    predictions :{},
    selecteditem :{},
    polyline :{},
    distance:{},
    duration :{},
    isloading : true,
    online : false,
    requestaccepted :{},
    trip_id :{},
    newrequest : {},
    loggedout : false,
    loggedin : true
   
}


export function HomeReducer (state =initialState,action){
const handler = ACTION_HANDLERS[action.type]
return handler ? handler(state,action) : state;
}
