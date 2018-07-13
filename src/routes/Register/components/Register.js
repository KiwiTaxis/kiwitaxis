import React,{Component} from 'react';
import { Text,View } from 'react-native';
import { Container } from 'native-base';
import { MainComponent } from './MainComponent/MainComponent';

class Register extends Component{
            componentDidMount(){
              this.props.username ='';
              this.props.password ='';
              
              
            }
            render()
            {
              return(
                  <View style={{flex:1}} >
                  <MainComponent  getUserName ={this.props.getUserName}
                  login = {this.props.login}/>  
                  </View>
                 );
            }
           } 
               
          
export default Register;