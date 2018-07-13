import React from "react";
import {Text,View,Component, TouchableOpacity, Button} from 'react-native';
import { InputGroup,Input,List,ListItem,CheckBox,Body } from 'native-base';
import styles from './FabStyles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Vibration from 'react-native';






 export const Fab = ({getonlineStatus,online,offline})=> {
   const DURATION =10000;
function accept(val){
    getonlineStatus({
    value:val
      
  });

}
return(
    
        <View style={styles.Notification}>
           <View style ={styles.button} >
     <Button  onPress={accept.bind(this,"offline")} color ="red" title="GO OFFLINE"  /> 
         
         
          
               
             </View>
               </View>
            
        
     
           
                
);
}
export default Fab;