import React from "react";
import {Text,View,Component, TouchableOpacity, Button,Sound, AsyncStorage} from 'react-native';
import { InputGroup,Input,List,ListItem,CheckBox,Body, Image } from 'native-base';
import styles from './NotificationStyle.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Vibration from 'react-native';
import {Actions} from 'react-native-router-flux'
//import Beep from '../../../Assets/Beep.wav'





 export const Notification = ({requestreceived,getDriverRequest,newrequest})=> {
   const DURATION =10000;
   function accept(key,value){
    console.log(key);
    AsyncStorage.getItem('token').then((data)=>{
      console.log(data);
      getDriverRequest(key,data)
      

    })
    //getDriverRequest
   }
   

return(
  
        <View style={styles.Notification}>
     
        
     
                <View style = {styles.icon}>
                 </View>
            
              <View style = {styles.rider}>
               <Text style = {styles.riderinformation}> 1 TRIP REQUEST </Text>
               <Icon name ="map-marker" style={{color:"#fff"}} />
               <Text  style = {styles.address}> {newrequest.src.location_str} </Text>
               <Icon name ="taxi" style={{color:"#fff"}} />
               <Text  style = {styles.address}>  {newrequest.dest.location_str} </Text>
               <View style ={styles.button} />
               <Button  onPress={accept.bind(this,"accept")} title="Accept" color="green" />
               <Button  onPress={accept.bind(this,"refuse")} title="Decline" color="red" />
             </View>
             </View>
             
                
);
}
export default Notification;