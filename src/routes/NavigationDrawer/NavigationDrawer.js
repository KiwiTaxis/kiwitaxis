import React,{Component} from 'react';
import Drawer from 'native-base';
import SideMenu from './SideMenu';

export default class NavigationDrawer extends Component{
    render()
    {
        const state = this.props.navigationState;
            const children = this.props.children;
      
            return (
                <Drawer
                    ref="navigation"
                    open={state.open}
                    onOpen={()=>Actions.refresh({key:state.key, open: true})}
                    onClose={()=>Actions.refresh({key:state.key, open: false})}
                    type="static"
                    content={<SideMenu />}
                    tapToClose={true}
                    /*captureGestures={true}*/
                    /*panOpenMask={0.02}*/
                    openDrawerOffset={0.2}
                    panCloseMask={0.2}
                    negotiatePan={true}
                    tweenHandler={(ratio) => ({
                        main: { opacity:Math.max(0.54,1-ratio) }
                    })}>
                    <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
                </Drawer>
        
            );
            Actions.refresh({key: 'drawer', open: value => !value });


        
    }
}
