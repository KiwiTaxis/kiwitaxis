import {connect} from 'react-redux';
import Notification from  "../Notification";
import {bindActionCreators} from 'redux';

import  { getCurrentLocation,getonlineStatus} from '../module/home';

const mapStatetoProps=(state)=>({
    requestreceived : state.notification.requestreceived ||{}
	

	
});


const mapDispatchToProps =(dispatch) =>{
return bindActionCreators({
    getSocketData,


},dispatch);

}
export default connect(mapStatetoProps,mapDispatchToProps)(Notification)


