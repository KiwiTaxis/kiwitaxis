import React, { Component } from 'react'
import { Actions, Scene } from "react-native-router-flux";
import HomeContainer from './Home/container/HomeContainer';
import Registration from './Register/components/Register/Registration' 
import Register from './Register/container/RegisterContainer';
import SwitchScreen from './Register/components/SwitchScreen/Switchscreen'
import {AsyncStorage} from 'react-native';
import Card from './Register/components/Register/Card' 


const scenes = Actions.create(
 
    <Scene key="root">
    <Scene key ="switchscreen" component ={SwitchScreen} hideNavBar ="true"  />
    <Scene key ="login" component ={Register} hideNavBar ="true"   />
    <Scene key ="register" component ={Registration} hideNavBar ="true" />
    <Scene key ="card" component ={Card}  title="CARD"  />
    <Scene key ="home" component ={HomeContainer}  hideNavBar ="true" title="HOME" />

    </Scene>
);
export default scenes;