import React from "react";
import {Text,View,Component, TouchableOpacity, Button} from 'react-native';
import { InputGroup,Input,List,ListItem,CheckBox,Body } from 'native-base';
import styles from './FabStyle.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Vibration from 'react-native';
import {AsyncStorage} from 'react-native';





 export const Options = ({getonlineStatus,online,offline,getarrivalstatus,arrived,starttrip,finishtrip})=> {
   const DURATION =10000;

          
     function accept(val,token){
         // console.log(tokenidentifier);
        getarrivalstatus({
            value:val,
            token:AsyncStorage.getItem('token')
          })
  
         
          }
          function logout()
          {
            token:AsyncStorage.getItem('token')
            this.props.logout(token)
          }
          function finishtripp(val,token){
            token:AsyncStorage.getItem('token')
            finishtrip({
              value:val,
              token:AsyncStorage.getItem('token')
            })
          }
  
        
         // setInterval(accept(val,token),5000);
     
return(
    
        <View style={styles.Notification}>
           <View style ={styles.button} >
           {arrived == true  ? <Button  onPress={accept.bind(this,"starttrip")} color ="green" title="START TRIP"  /> : <Button  onPress={accept.bind(this,"arrived")} color ="#000080" title="Arrived"  />
            
          }  
            
          <Button  onPress={finishtripp.bind(this,"finishtrip")} color ="red" title="FINISH TRIP"  />
        
          </View>
          </View>
           
        
     
           
                
);
}
export default Options;