import React from "react";
import {Text,View,Component, TouchableOpacity, Button} from 'react-native';
import { InputGroup,Input,List,ListItem,CheckBox,Body } from 'native-base';
import styles from './FabStyles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Vibration from 'react-native';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';




 export const Fab = ({getonlineStatus,online,offline,logout})=> {
   const DURATION =10000;

          
     function accept(val,token){
         // console.log(tokenidentifier);
        getonlineStatus({
            value:val,
            token:AsyncStorage.getItem('token')
          })
  
         
          }
          function logoutbtn()
          {
         
           logout(AsyncStorage.getItem('token'))
          }
          function ratingf(){
            Actions.rating();
          }
        
         // setInterval(accept(val,token),5000);
     
return(
    
        <View style={styles.Notification}>
           <View style ={styles.button} >
          { online == false ?
            <Button  onPress={accept.bind(this,"online")} color ="green" title="GO ONLINE"  /> 
           :<Button  onPress={accept.bind(this,"offline")} color ="red" title="GO OFFLINE"  />
          }
          
        
         
          
               
             </View>
               </View>
            
        
     
           
                
);
}
export default Fab;