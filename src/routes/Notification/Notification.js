import React,{Component} from 'react';
import { Text,View, AsyncStorage } from 'react-native';
import Mapview from 'react-native-maps';
//import MapContainer from './Mapcontainer';
import { Container } from 'native-base';
import io from 'socket.io-client'



let socket = io('http://54.252.173.49:6001');




class Notification extends Component{

    componentDidMount(){
  
        if(socket.connect())
        {           
         this.props.getSocketData();
        
        }
    
      
    }
   
            render(){ 
                const requestreceived ={
                 
                }
                
            return(
                <View style ={{flex:1}}>
               
            
               {this.props.requestreceived &&
              <View style={styles.Notification}>
          
              <View style = {styles.icon}>
               </View>
          
            <View style = {styles.rider}>
             <Text style = {styles.riderinformation}> 1 TRIP REQUEST </Text>
             <Text  style = {styles.address}> 2-6 Waverly Street </Text>
             <View style ={styles.button} />
             <Button  onPress={accept} title="Accept"  />
           </View>
           </View>
            }
               
             
               
                 </View>

            );
         
        }
            }
export default Notification;