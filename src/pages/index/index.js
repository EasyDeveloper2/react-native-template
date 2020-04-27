import React, { Component } from 'react';
import { View, Text ,SafeAreaView,TouchableOpacity, StyleSheet,Platform,Dimensions} from 'react-native';
import Do ,{AdMobBanner}from '../../do/index';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };    
  }
  
 
  render() {
    return (
      <TouchableOpacity onPress={()=>{
        // Do.openCamera({width:100,height:100}).then(res=>{
        //   console.log(res)
        // })
      }}>
        <AdMobBanner
  adSize="fullBanner"
  adUnitID="your-admob-unit-id"
  testDevices={[AdMobBanner.simulatorId]}
  onAdFailedToLoad={error => console.error(error)}
/>
      </TouchableOpacity>
    );
  }
}

export default Index;

const style1 =StyleSheet.create({
    text:{
     marginLeft:Do.sw(40),
     width:100,
     aspectRatio:1,
     backgroundColor:'red'
   }
})

