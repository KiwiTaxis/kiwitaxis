import React, { Component } from "react";
import {ActivityIndicator} from "react-native";


export default class Loader extends Component{
	constructors(props){
    super(props)
   this.state.loading = true;
       
}
componentDidMount(){

}
render(){
return(
    <ActivityIndicator />


)

}

}
export default Loader;



