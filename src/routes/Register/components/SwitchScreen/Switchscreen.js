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
    } from 'react-native';




import { Menu, MenuProvider,MenuOptions,MenuOption,renderers} from 'react-native-popup-menu';
import styles from './SwicthStyles';

/* Get Physical Device size */ 
let {width, height} = Dimensions.get('window');
import { Actions } from 'react-native-router-flux';
/* declaring values as constants */




export const SwitchScreen=()=>{
  

    return( 
    <View style = {styles.container}>
			<View style ={styles.logocontainer}>
                    <Image source={require('./logonew.png')}   />
			</View>
			
			<View style = {styles.switchbutton}>
			<View style ={styles.buttoncontainer}>
				<TouchableOpacity style={styles.signin}>
						<Text  style={styles.buttontextss} onPress ={()=>Actions.login()} >Login </Text>
				</TouchableOpacity>
          </View>
			
          <View style = {styles.switchbuttonn}>
            <TouchableOpacity style= {styles.signup}>
                    <Text style={styles.buttontext} onPress ={()=>Actions.register()}>  Register </Text>
            </TouchableOpacity>
            </View>
                
         </View>
	  </View> 
);
};
export default SwitchScreen;