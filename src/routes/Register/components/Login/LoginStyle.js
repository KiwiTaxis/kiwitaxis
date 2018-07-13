import {Dimensions} from 'react-native';

let {width, height} = Dimensions.get('window');

const styles = {
    container:{
        flex:1,
        justifyContent : 'center',
        alignItems : 'center',
        height:200,
        backgroundColor: '#fff',
        },
    logocontainer:{
    flexGrow: 1,
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor: '#000080',
        width:width,
        height:height/4
        
    },
    regiform:{
    flexGrow: 1,
    alignItems:'center',
    justifyContent :'center',
    backgroundColor: '#000080',
    width:width
    },
    
    buttoncontainer:{
    
    paddingVertical :5,
    borderRadius:20,
    backgroundColor:'rgba(224,255,255,0.6)',
    width:250, 
    
    },
    buttontext:{
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
        backgroundColor:'rgba(244,255,255,0.9)',
        paddingBottom :10,
        marginBottom :30,
        borderRadius: 25,
        width:300,
        height:50,
        textAlign:'center',
        color:'#000080',
    },
    pass:{
        fontSize : 14,
        backgroundColor:'rgb(255,255,255)',
    },
};
    export default styles;