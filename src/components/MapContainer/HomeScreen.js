    /**
     * Sample React Native App
     * https://github.com/facebook/react-native
     * @flow
     */

          import React, { Component } from 'react';

              import {
                AppRegistry,
                Platform,
                StyleSheet,
                Text,
                TextInput,
                TouchableOpacity,
                View,
                Image,
                Dimensions,
                Button,
                ActivityIndicator,
                Modal, ToastAndroid
              } from 'react-native';
        import MapView, {  PROVIDER_GOOGLE  }  from 'react-native-maps';
        import RetroMapStyle from './MapStyles/RetroMapStyle.json';
        import RNGooglePlaces from 'react-native-google-places';
        import  Icon  from 'react-native-vector-icons/FontAwesome';
        import SearchResult from './SearchResult.js';
        import { Menu, MenuProvider,
          MenuTrigger,
          MenuOptions,
          MenuOption,
          renderers} from 'react-native-popup-menu';
          import { Polyline } from 'react-native-maps';
      
          
          
    /* Get Physical Device size */ 
    let {width, height} = Dimensions.get('window');
    /* declaring values as constants */
    const ASPECT_RATIO = width/height;
    const LATITUDE = 0;
    const LONGITUDE = 0;
    const LATITUDE_DELTA = 0.0104;
    const LONGITUDE_DELTA = 0.041;
    const {SlideInMenu} = renderers;
    const Distance = 0;
    const routes =[];
   
    export default class HomeScreen extends Component {
     
     
    /* setting state and initializing values */
    constructor(){
    super();
    this.mapRef = null;
        this.state =({
        region:{
                  latitude:LATITUDE,
                  longitude : LONGITUDE,
                  latitudeDelta : LATITUDE_DELTA,
                  longitudeDelta : LONGITUDE_DELTA,
              },
              points:[],
              text: 'Pickup',
              textt : 'Destination',
              pickupaddress : ' ',
              modal :'',
              modalVisible : false,
                addresslat:LATITUDE,
                addresslng : LONGITUDE,
        
         
              distance: Distance,
              duration: Distance,
              poly : ' ',
              estimation : false,
              
               showindicator : true
              
              
             });
          
              }
              openModal = ()=> {
                this.setState({modalVisible:true});
                console.log();
              }
               //after the user decides the final pickup location it will be displayed with polyline
              closeModal = () =>{
                this.setState({modalVisible:false});
                console.log("entered")
                console.log(this.state.textt);
              
               const destination = JSON.stringify(this.state.textt);
               const pickup = JSON.stringify(this.state.pickupaddress);
                console.log(destination);
                console.log(this.state.pickupaddress);
             
                 this.polyline();
                }
                polyline=() => {
                try{
                fetch('https://maps.googleapis.com/maps/api/directions/json?origin=+'+(this.state.pickupaddress)+'+&destination='+(this.state.textt)+'&key=AIzaSyBWke_00RksOBNheCG6v3HSeF8UsGyZQus')
                .then((res) => res.json())
                .then((res) => {
                  console.log((res));
                  if(res.status == "OK"){
                    console.log(res.routes[0].legs[0].distance);
                    console.log(res.routes[0].legs[0].duration);
                    this.setState({
                      duration:res.routes[0].legs[0].duration,
                      distance: res.routes[0].legs[0].distance
                    })
                  
                    
                    var encoded = res.routes[0].overview_polyline.points;
                    this.setState({
                      points:decode(encoded)
                      })
                      this.setState({
                        poly:true   
                      })
                     
                      console.log(this.state.points);
               
                      
                                   
                  // decoding the polyline by google api
                    
                  function decode(encoded){
                 
                  var points=[ ]
                  var index = 0, len = encoded.length;
                  var lat = 0, lng = 0;
                  while (index < len) {
                      var b, shift = 0, result = 0;
                      do {
              
                            b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                            result |= (b & 0x1f) << shift;
                            shift += 5;
                           } while (b >= 0x20);
              
              
                     var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                     lat += dlat;
                    shift = 0;
                    result = 0;
                   do {
                      b = encoded.charAt(index++).charCodeAt(0) - 63;
                      result |= (b & 0x1f) << shift;
                     shift += 5;
                       } while (b >= 0x20);
                   var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
                   lng += dlng;
               
                 points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})  
               
                 }
                return points
                  }
                 }
                else{
                 console.log("is your destination correct")
                 this.setState({
                   points : []
                  });
                  ToastAndroid.show('Sorry! Something went wrong', ToastAndroid.SHORT);
                 
                } 
                }); 
                }  
              catch(error){
                console.log(error)
              }
            
            } 
                    
              
              
             
               
              
 
    /* Component will change the state initialized will be changed in render  */
    componentDidMount(){
      
  
    navigator.geolocation.getCurrentPosition(
    position => {
    this.setState({
    region : {
          latitude: position.coords.latitude,
          longitude : position.coords.longitude,
          latitudeDelta :   LATITUDE_DELTA,
          longitudeDelta :  LONGITUDE_DELTA,
           }
             });
             console.log(position);
           getaddress(position);
    
           
    } 
    ,(error) => console.log(error.message),
    {enableHighAccuracy : false,timeout:2000},
    ); 
   
            
    
    this.watchID = navigator.geolocation.watchPosition(
    position => {
  
  this.setState({
    region:{
        latitude:   position.coords.latitude,
        longitude : position.coords.longitude,
        latitudeDelta :   LATITUDE_DELTA,
        longitudeDelta :  LONGITUDE_DELTA,
          
      }
    });
    } 
   
  ) 
  
  //function 
  getaddress=(position)=>{  
    console.log(this.state.region.latitude);
 var lat = (position.coords.latitude); //JSON.stringify
 var lng =(position.coords.longitude);// JSON.stringify
 console.log(lat);
 console.log(lng);
 //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

  fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=+'+(lat)+','+(lng)+'&key=AIzaSyBWke_00RksOBNheCG6v3HSeF8UsGyZQus')
  .then((response) => response.json())
    .then((response) => {
     if(response.status="OK"){
       
       
       this.setState({
         pickupaddress : response.results[0].formatted_address
         });
         this.setState({
           showindicator:false
         })
        }
        else{
          ToastAndroid.show('A pikachu appeared nearby !', ToastAndroid.SHORT);
              }
            });
          }
         }
  
    componentWillUnmount() {
      navigator.geolocation.clearWatch(this.watchID);
    }
    
      
      //Autocomplete Modal  
      openSearchModal= ()=>{

      RNGooglePlaces.openAutocompleteModal()
      .then((place) => {
      console.log(place);
       this.setState({textt:place.address});
       this.setState({modalVisible:true});
       })
       
       
       // error is a Javascript Error object     

      .catch(error => console.log(error.message));  
      
     
      }
    render(){
    return( 
      <View>  
       <Modal
            visible={this.state.modalVisible}
            animationType={'fade'}
            onRequestClose ={()=> this.closeModal()}
            transparent={true}>
            <View style={[styles.modalcontainer]}>
            
           <View style ={[styles.closemodalreq]}>
            <Button
            onPress = {this.closeModal}
            title ="Done" 
            backgroundColor ="#000080"
             >
              </Button>
              </View>

              </View>
           </Modal>
        <View style ={styles.destination}>
    {this.state.showindicator && 
    <ActivityIndicator  size="large" color="#0000ff"/> }
        <Button style={styles.destination} 
        onPress = {() => this.openSearchModal } title ={this.state.pickupaddress}>
       
        </Button>
        <Button style={styles.destination} 
        onPress = {this.openSearchModal } title ={this.state.textt} >
        <Text> {this.state.points} </Text>
        </Button>
      
        
      
        <MapView provider = {PROVIDER_GOOGLE}

          style = { styles.container }
          customMapStyle = {RetroMapStyle}
          showsUserLocation = {true}
          region = { this.state.region }
                zoomEnabled={false}
                 >
        {this.state.points && 
        <MapView.Polyline
        coordinates ={this.state.points}
        strokeWidth={4}
         strokeColor="rgba(255,140,0,0.8)"
         />
                
        }</MapView>
          </View>
         </View>
         
             

         )}}
    const styles = StyleSheet.create({
    container:{
    height: '100%',
    width :'100%',
    },
    header:{
      height: '5%',
      marginTop:0,
    },
    marker:{
      height:'05',
      width:'40',
      marginLeft:'20'   },
    markerbtn:{
      backgroundColor: '#000080',
      
    },
    overlay: {
      flex: 1,
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0.5,
      backgroundColor: 'black',
      width: width,
     } ,
     fare: {
      flex:1,
      position: 'absolute',
      flexDirection:'column',
      left: 0,
      top: height-110,
      width: width/2,
      
       } ,
     optionsrider:{
    color:'#fff',
    width:width
    },
    payment:{
     // flexShrink:-10,
      position:'absolute',
      left:width/2,
      width:width/2
    },
    request:{
      width:width,
      left:0,
      top:10
    },
    modalcontainer:{
      flexGrow:30,
      alignItems:'center',
      justifyContent:'center',
      
    // width:width/2,
     // left:width/2,
     

    },
    closemodalreq:{
      flexGrow:3,
      justifyContent:'flex-end',
      width:width
     },
    
     
   });
   module.exports = HomeScreen;