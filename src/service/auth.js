import Toast from '../utils/toast';
import config from '../config/config';
import Api from './api';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';


let handleErrorMsg=(text)=>{
     let msg = text
    if (text.indexOf("@@@") > -1){
      msg = text.split('@@@')[1]
    }
    return msg
}

export let wxLogin = (params={})=>{
    return new Promise((resolve,reject)=>{
        params.channel = config.channel
        let  headers = {}
        headers['Content-Type'] = 'application/json'
        fetch(config.baseURL + Api.wxLogin, {
            method: 'POST',
            headers,
            body: JSON.stringify(params),
        }).then(res=>res.json()).then(res => {
            if(res.code==201){
                AsyncStorage.setItem("token",res.body.accessToken)
                resolve(res.body)
            }else{
                reject(res)
            }
        }).catch(error => {
            console.log(err)
            Toast.show({
                text: '请检查手机网络',
                buttonText: 'Okay',
                duration: 1500,
                position: "top",
                type: "danger"
            })
            reject(error)
        })
    })
}

export let phoneLogin = (params={})=>{
  return new Promise((resolve,reject)=>{
    params.channel = config.channel
    let  headers = {}
    headers['Content-Type'] = 'application/json'
 
    fetch(config.baseURL + Api.phoneLogin, {
        headers,
        method: 'POST',
        body: JSON.stringify(params),
    }).then(res => res.json()).then(res => {
        if(res.code==201){
            if(res.body.accessToken){
                AsyncStorage.setItem("token",res.body.accessToken)
            }
            resolve(res.body)
        }else{
            Toast.show({
                text: handleErrorMsg(res.exception.message),
                duration: 1500,
                position: "top",
                type: "danger"
            })
            reject(res)
        }
    }).catch(error => {
        console.log(err)
        Toast.show({
            text: '请检查手机网络',
            duration: 1500,
            position: "top",
            type: "danger"
        })
        reject(error)
    })
  })
}

export default {
    wxLogin,
    phoneLogin
}