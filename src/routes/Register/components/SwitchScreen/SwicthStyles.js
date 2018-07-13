

import {Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

const styles ={
    container:{
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
        height:200,
        
        backgroundColor: '#000080',
        },
            logocontainer:{
            flexGrow: 30,
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
    };
export default styles;
