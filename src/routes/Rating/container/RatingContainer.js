import {connect} from 'react-redux';
import Ratingreview from  "../Rating";
import {bindActionCreators} from 'redux';

import  { } from '../module/home';

const mapStatetoProps=(state)=>({
	
});


const mapDispatchToProps =(dispatch) =>{
return bindActionCreators({getCurrentLocation,
	

},dispatch);

}
export default connect(mapStatetoProps,mapDispatchToProps)(Navigation)


