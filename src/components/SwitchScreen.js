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
      Dimensions
    } from 'react-native';




import { Menu, MenuProvider,
MenuTrigger,
MenuOptions,
MenuOption,
renderers} from 'react-native-popup-menu';
/* Get Physical Device size */ 
let {width, height} = Dimensions.get('window');
/* declaring values as constants */


export default class SwitchScreen extends Component {
dragEnd= () => {
console.log()
}

/* setting state and initializing values */
constructor(){
super();




      }

/* setting state and initializing values */
componentDidMount(){




}
componentWillUnmount() {
navigator.geolocation.clearWatch(this.watchID);
}
viewMarker()
{
console.log('marker')
}

render(){
return( 
    <View style = {styles.container}>
			<View style ={styles.logocontainer}>
                    <Image   source={require('./logonew.png')}   />
			</View>
			
			<View style = {styles.switchbutton}>
			<View style ={styles.buttoncontainer}>
				<TouchableOpacity style={styles.signin}>
						<Text  style={styles.buttontextss} onPress={() => this.props.navigation.navigate('Login')}>  SIGNIN </Text>
				</TouchableOpacity>
          </View>
			
          <View style = {styles.switchbuttonn}>
            <TouchableOpacity style= {styles.signup}>
                    <Text style={styles.buttontext} onPress={() => this.props.navigation.navigate('Home')}>  SIGNUP </Text>
            </TouchableOpacity>
            </View>
                
         </View>
	  </View> 



)}}
const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
        height:200,
        
        backgroundColor: '#000080',
        },
    logocontainer:{
    flexGrow: 30
    ,
        justifyContent : 'center',
        alignItems : 'center',
        },
        switchbutton:{
            flex: 6,
        flexDirection:'column',
        height :30,
        justifyContent:'flex-end'
         }, 
         switchbuttonn:{
            flexShrink: -6,
        flexDirection:'column',
        height :3,
        justifyContent:'flex-end'
         }, 
    buttoncontainer:{
    backgroundColor:'white',
    width: width/2,
    //marginleft:0     
    },
    signin:{
      
        backgroundColor:'white',
        width: width/2,
        //marginleft:0     
        },
        signup:{
            backgroundColor:'#000080',
            width: width/2,
            marginLeft:width/2
                 
            },
    buttontext:{
        textAlign:'center',
        color :'#fff',
        fontSize:16,
    },
    buttontextss:{
        textAlign:'center',
        color :'#000080',
        fontSize:16,
    },
    heading:{
        fontSize : 24,
        color :'#fff',
        paddingBottom :10,
        marginBottom :40,
        borderBottomColor: '#fff',
        borderBottomWidth: 0.5,
    },
    input:{
        fontSize : 14,
        backgroundColor:'rgba(224,255,255,0.5)',
        paddingBottom :10,
        marginBottom :30,
        borderRadius: 25,
        width:300,
        height:50,
        textAlign:'center',
        color:'#fff',
    },
    pass:{
        fontSize : 14,
        backgroundColor:'rgba(255,255,255,0.5)',
    },
    });
module.exports = SwitchScreen;