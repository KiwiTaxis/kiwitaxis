import React,{Component} from 'react';
import { Text,View } from 'react-native';
import Mapview from 'react-native-maps';

import Login from '../Login/Login'
import SwitchScreen from '../SwitchScreen/Switchscreen'; 
import { Container } from 'native-base';



    export const MainComponent =({getUserName,login})=>{
            
        return(
        <View style={{flex:1}}>
        <Login getUserName ={getUserName}
        login = {login}
        />
        </View>
            );

};
export default MainComponent;