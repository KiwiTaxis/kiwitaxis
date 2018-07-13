import {connect} from 'react-redux';
import Register from  "../components/Register";
import {bindActionCreators} from 'redux';

import  {getUserName,login} from '../module/register.js';

                    const mapStatetoProps=(state)=>({
                        login :state.register.login || {},
                        loginscreen :state.register.loginscreen || {},
                        username :state.register.username || {},
                        password :state.register.password || {}
                    });


                    const mapDispatchToProps =(dispatch) =>{
                    return bindActionCreators({ getUserName,
                        login
                    },dispatch);

                    }
        export default connect(mapStatetoProps,mapDispatchToProps)(Register)


