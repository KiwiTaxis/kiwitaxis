		import React,{Component} from 'react';
		import {
		AppRegistry,
		StyleSheet,
		Text,
		View,
        NetInfo
		} from 'react-native';

	
		import { StackNavigator } from 'react-navigation';
		import { MenuProvider } from 'react-native-popup-menu';
	//	import { HomeScreen } from './src/components/HomeScreen.js';
        export default class ConnectionInfo extends Component
        {

            constructor()
            {
            super();
                this.state=({
                    connection:{
                        status : 'online'
                    }
                })
             }
            componentDidMount()
            {
            NetInfo.getConnectionInfo().then((connectionInfo)=>{
                console.log('Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType);
                this.setState({
                    connection:{
                        status: connectionInfo.type
                    }
                })

            });
            NetInfo.addEventListener(
                'connectionChange',
                handleFirstConnectivityChange
              );
              function handleFirstConnectivityChange(connectionInfo){
                if(connectionInfo != 'none'){
                    console.log(connectionInfo);
                  
                }
                    
              }
            
            }
            componentWillMount(){
                NetInfo.removeEventListener(
                    'connectionChange',
                    handleFirstConnectivityChange
                )
            }
            render(){
            
            }
        }
            module.exports = ConnectionInfo; 
