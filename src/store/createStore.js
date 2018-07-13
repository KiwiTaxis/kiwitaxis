import{createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import { makeRootReducer } from './reducers';
import createSocketIoMiddleware from 'redux-socket.io';
window.navigator.userAgent = "react-native"
import io from 'socket.io-client';
import AsyncStorage from 'react-native';
import update from "react-addons-update";
import watch from 'redux-watch';
// requesting server connection 
let socket = io('http://54.252.173.49:6001');
// applymiddleware


let socketIoMiddleware = createSocketIoMiddleware(socket, "server/");



const log = createLogger({ diff: true, collapsed: true });
const enhancers =[];
console.log("store");
// a function which can create our store and auto-persist the data


console.log(socket.connect());

   


console.log("call")
export default (initialState) =>{

    
const middleware = [thunk,log,socketIoMiddleware]





const store = createStore(
   
    makeRootReducer(),
   initialState,


    compose(
        applyMiddleware(...middleware),
        ...enhancers
       
    ),
   
  
    
);
socket.on('driverChannel:request_trip_8b719a90-3c51-11e8-803b-eb1d59c84872', (data) => {
    console.log('GetDataDone');
    //console.log(state.home.requestreceived);
    store.dispatch({
        type:'ApiGotData',
        requestreceived:data});
        });


store.subscribe((state)=>{
  console.log('new client state', store.getState());
 
});

  
    
return store;



}