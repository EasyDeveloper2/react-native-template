import React, { Component } from 'react';
import { View, Text, Clipboard,Dimensions, Alert,SafeAreaView } from 'react-native';

class Me extends Component {
  constructor(props) {
    super(props);
    //const {width,height,scale,fontScale} = Dimensions.get('screen')
  
  }




  render() {
    return (
      
      <SafeAreaView style={{width:1000}}>
        <Text> Me </Text>
      </SafeAreaView>
    );
  }
}

export default Me;
