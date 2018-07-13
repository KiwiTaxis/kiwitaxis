import React from "react";
import {Text,View,Component, TouchableOpacity, Button} from 'react-native';
import { InputGroup,Input,List,ListItem,CheckBox,Body } from 'native-base';
import styles from './NavigationStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import Vibration from 'react-native';
import {AsyncStorage} from 'react-native';
import {Actions} from 'react-native-router-flux';
import request from '../../util/request';



        export const SideMenu = ()=> {
                        myProfile=()=>{
                        
                                Actions.profile();
                        }
                        myTrips =() =>{
                                Actions.trips();
                        }

                        logout = () =>{
                                const tokenvalue = AsyncStorage.getItem('token')
                                Promise.resolve(tokenvalue).then(function(val){

                                
                                request.post('http://54.252.173.49/api/driver/logout')
                                .query({
                                        api_token : val
                                }).finish((error, res)=>{
                                console.log (res); 
                                if(res.body.errMsg === "success")
                                {
                                        AsyncStorage.removeItem('token');  
                                        Actions.login();
                                }
                                })

                                })
                        }

                return(
                       <View style ={styles.options}>
                                                        <TouchableOpacity onPress={()=>myProfile()}> 
                                                                <Icon name = "user" size ={20}  color="#000080">
                                                                <Text style={{fontSize:20}}> Profile </Text>
                                                                </Icon>
                                                        </TouchableOpacity>
                                                
                                                
                                                        <TouchableOpacity onPress={()=>myTrips()} > 
                                                                <Icon name = "taxi" size ={20}  color="#000080">
                                                                <Text  style={{fontSize:20}}> My Trips </Text>
                                                                </Icon>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity onPress={()=>myTrips()} > 
                                                                <Icon name = "power-off" size ={20}  color="#000080" onPress = {()=>logout()} >
                                                                <Text  style={{fontSize:20}}> Sign Out </Text>
                                                                </Icon>
                                                        </TouchableOpacity>
                        </View>
                                
                );
   }
export default SideMenu;