import React,{Component} from 'react';
import { Text,View, AsyncStorage } from 'react-native';
import Mapview from 'react-native-maps';
import MapNavigate from './MapNavigate';
//import Navigate from './Navigate';
import { Container } from 'native-base';
import io from 'socket.io-client';
import {Actions} from 'react-native-router-flux';

class Navigation extends Component{

    componentDidMount(){
     
      
        
     this.props.getCurrentLocation();
      
    }
    componentDidUpdate(prevProps,nextProps)
    {
        if(this.props.setrating == true)
        {
           
        }

       
    }
  
    
   
	
   
            render(){ 
                const region ={
                    latitude: -36.8485,
                    longitude: 174.7633,
                    latitudeDelta:0.0101,
                    longitudeDelta:0.01,

                }
                
            return(
                <View style ={{flex:1}}>
               
            
               {this.props.region.latitude &&
                <MapNavigate region= {this.props.region}
                points ={this.props.points}
                minimum ={this.props.minimum}
                maximum = {this.props.maximum}
                getonlineStatus ={this.props.getonlineStatus}
                online = {this.props.online}
                offline ={this.props.offline}
                requestreceived  = {this.props.requestreceived}
                getDriverRequest = {this.props.getDriverRequest}    
                newrequest = {this.props.newrequest} 
                getarrivalstatus ={this.props.getarrivalstatus}
                arrived ={this.props.arrived}
                changedregion = {this.props.changedregion}
                logout ={this.props.logout}
                starttrip ={this.props.starttrip}
                finishtrip={this.props.finishtrip}
                finishedtrip ={this.props.finishedtrip}
                setrating ={this.props.setrating}
                submitRating ={this.props.submitRating}
                ratingCompleted ={this.props.ratingCompleted}
                rating ={this.props.rating}
                />
            }
               
           
               
                 </View>

            );
         
        }
            }
export default Navigation;