import React from "react";
import {Text,View,Component, TouchableOpacity, Button} from 'react-native';
import { InputGroup,Input,List,ListItem,CheckBox,Body } from 'native-base';
import styles from './headerStyles.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Vibration from 'react-native';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
export const HeaderIcon = ({getonlineStatus,online,offline,logout})=> {
 function actioncalled(){
   Actions.drawer();
     
 }
 return(
        <View style={styles.Notification}>
        <Icon name="bars"
          size ={30} 
          style={styles.icons} 
          onPress ={()=> actioncalled()}
        />   
       
        </View>
       

        );
            }
export default HeaderIcon;