import update from "react-addons-update";
import constants from "./actionConstants";
import request from '../../../util/request';





const{ GET_FORM_VALUES, GET_LOGIN_CREDENTIALS } = constants;

// actions to be performed


//actions (actions has two properties  :- dispatch(that is when the state change happens then its dispatched to the reducer and then to store) , payload(return type)) 

//get current location
           
           // getElementById
           export function getUserName(payload){
              
            return{
                    type:"GET_FORM_VALUES",
                    payload
                }

            } 
        
        
        function handleGetUserName(state,action)
        {
            const{key,value} = action.payload;
            console.log(value);
            const username = JSON.stringify(value);
            
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            console.log(re.test(value));
           if(key === "username")
            {
            return update(state,{
             username:{
                $set :value
             }
            })
        }
        if(key === "password")
        {
            return update(state,{
                password:{
                   $set :value
                }
               })

        }

        }

              //get value for login
                export function getSwicthValue(payload){
                return(dispatch,store)=>{
                    dispatch({
                        type:"GET_SWITCH_VALUE",
                        payload
                    })

                } 
            }
            function handlegetSwicthValue(state,action){
            
                return update(state,{
                    login:true
                })
            }
            const ACTION_HANDLERS = {
            GET_FORM_VALUES : handleGetUserName,
        
            };

            export function login(payload){
                return(dispatch,store)=>{
                const username = store().register.username;
                const password = store().register.password;
                console.log(username);
                if(store().register.username != " ")
                {
                    console.log("thsldfj");
                }else{
                    request.post('http://54.252.173.49/api/passenger/login')
                    .query({
                            email : store().register.username,
                            password:  store().register.password
                      })
                      .finish((error, res)=>{
                          console.log(error)
                      dispatch({
                       type: "GET_LOGIN_CREDENTIALS",
                       payload: res,
                       })
                    
                      })  
                                   
                }
            }
        }       

            function handleLogin(){
                console.log("");


            }




 
const initialState ={
    loginscreen :{},
    login :{},
    username :{},
    password :{},
    isloading :{}
 };


export function RegisterReducer(state=initialState,action){
const handler = ACTION_HANDLERS[action.type];
return handler ? handler(state,action) : state;
}
