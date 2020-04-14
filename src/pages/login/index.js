import React, { Component } from 'react';
import  render from './render'

class Login extends Component {
    // 如果要使用自定义导航 请不要在路由进行配置
    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title'),
        };
      };
    constructor(props) {
        super(props);
        this.state = {
        };
      }
 render(){
     return render(this)
 }
 
  onLogin = ()=>{
      // 进入下一个页面
      // 需要页面进行刷新时使用
      //this.props.navigation.setParams({ title: 'Updated!' })
      this.props.navigation.navigate("Index")
  }
}

export default Login;


