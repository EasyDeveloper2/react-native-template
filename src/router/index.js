import {Image} from 'react-native';
import React from 'react'; //不能缺省
import Login from '../pages/login/index';
import Index from '../pages/index/index';
import Me from '../pages/me';

import {Router,Scene,Modal,Stack,Tabs} from 'react-native-router-flux'

// // 创建一个根组件
const App = ()=>{
    return <Router>
    <Tabs key="root" activeTintColor="#ED5601" inactiveTintColor="#8F8F8F" labelStyle={{fontSize:11}}>
     <Scene key="index" component={Index} title="首页" icon={tabIcon}/>
     <Scene key="me" component={Me} title="我的" icon={tabIcon}/>
   </Tabs>
   </Router>
}
export default App
const tabIcon = ({ focused, title }) => {
    let list = {
      '首页': {
        icon: require('../assets/images/index.png'),
        activeIcon: require('../assets/images/index_press.png')
      },
      '我的': {
        icon: require('../assets/images/me.png'),
        activeIcon: require('../assets/images/me_press.png')
      }
    }
    let item = list[title]
    if (!focused) {
      return (
        <Image resizeMode="contain" style={{ width: 20, height: 20 }} source={item.icon} />
      );
    } else {
      return (
        <Image resizeMode="contain" style={{ width: 20, height: 20 }} source={item.activeIcon} />
      );
    }
}
