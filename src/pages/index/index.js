import React, { Component } from 'react';
import { View, Text ,SafeAreaView,TouchableOpacity, StyleSheet,Platform,Dimensions} from 'react-native';

import { StackActions, NavigationActions,SwitchActions } from 'react-navigation';
const sw = (width)=>{
    return parseInt(width * Dimensions.get('window').width/375.0) 
}
import {Actions} from 'react-native-router-flux';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };    
  }
  
 
  render() {
    return (
      <TouchableOpacity onPress={()=>{
     
        Actions.refresh({name:'xxx'})
      }}>
        <Text style={style1.text}> index </Text>
      </TouchableOpacity>
    );
  }
}

export default Index;

const style1 =StyleSheet.create({
    text:{
     marginLeft:sw(40),
     width:100,
     aspectRatio:1,
     backgroundColor:'red'
   }
})

const style2 =StyleSheet.create({
    text:{
     width:100,
     aspectRatio:1,
     backgroundColor:'red'
    }
})
