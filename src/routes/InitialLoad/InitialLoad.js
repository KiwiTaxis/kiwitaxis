import React, { Component } from "react";
import { Router } from "react-native-router-flux";
import {View, AsyncStorage, AccessibilityInfo, ActivityIndicator,Text } from 'react-native';
import {Actions} from 'react-native-router-flux';


class InitialLoad extends Component {

	
	constructor(){
		super()
		this.state ={
            isloading : true,
            hastoken: false
			
		}
	}
	componentDidMount() {
        setTimeout(() => {
            
        
        try{
               AsyncStorage.getItem('token').then((token)=>{
                  if(token){
                    this.setState({
                        hastoken: true,
                        isloading: false
                    })
                    
                      
                          Actions.home()
                      
                  }
                  else{
                   
                        Actions.switchscreen()
                        this.setState({
                            hastoken: false,
                            isloading: false
                        })
                    
                  }

              })
        }catch(error){
            console.log(error);
            
        }
    }, 6000);
    }
    

	
	
		render(){
            
		return (
			<View style={{backgroundColor:"#000080"}}>
                <ActivityIndicator  visible ={this.state.isloading}/>
		</View>
		
	
			);
		}
    }
    export default InitialLoad;

