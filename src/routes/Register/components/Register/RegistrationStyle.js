import {Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

const styles = {
    container:{
    flex:1,
   
    }, input:{
        width:width/2
    },
    textinputs:{
        left:width/4
    },
       socialbuttons:{
        width:width/2,
        top : 10,
       

       },
       google:{
         position:"absolute",
         left:width/2,
           
           width:width/2

       },
       email:{
        textAlign: 'center',
       
       },
       socialbutton:{
        width:width/2,
        top : 10,
       

       },
       button:{
        textAlign: 'center',
        
        color:"#000080" 
       }
       
};
    export default styles;