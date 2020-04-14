import React, { Component } from 'react';
import { View, Text,TouchableOpacity,StyleSheet } from 'react-native';
export default (self)=>{
    return (
        <View style={styles.page}>
            <TouchableOpacity style={styles.btn} onPress={self.onLogin}>
               <Text style={styles.btnText}> 登录{self.state.name} </Text>
            </TouchableOpacity>
        </View>
      );
}
const styles = StyleSheet.create({
    page:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center'

    },
    btn:{
        width:100,
        height:44,
        borderRadius:4,
        backgroundColor:'#679',
        alignItems:'center',
        justifyContent:'center'
    },
    btnText:{
        color:'white',
        fontSize:15
    }
})

