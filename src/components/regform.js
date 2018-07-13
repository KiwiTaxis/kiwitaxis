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
  View
} from 'react-native';



export default class RegForm extends Component {
  render() {
    return (
      <View style={styles.regform}>
      <Text style={styles.heading}> Registration </Text>
	  <TextInput placeholder ="Your Name">
	  
	  </TextInput>
	   <TextInput placeholder ="Your Name">
	  
	  </TextInput>
      </View>
  
    );
  }
}

const styles = StyleSheet.create({

regform:{
alignSelf: 'stretch',

},
heading:{
	fontSize : 20,
color :'#fff',
paddingBottom :10,
marginBottom :40,
borderBottomColor: '#fff',
borderBottomWidth: 0.5,
}

});



module.exports = RegForm;