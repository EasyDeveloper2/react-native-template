import {AsyncStorage} from 'react-native'
import Toast from '../utils/toast';
import { Actions } from 'react-native-router-flux'
import config from '../config/config';

// import NetInfo from "@react-native-community/netinfo";

let handleErrorMsg=(text)=>{
    let msg = text
   if (text.indexOf("@@@") > -1){
     msg = text.split('@@@')[1]
   }
   return msg
}
// let  isConnectedNet = true

// const unsubscribe = NetInfo.addEventListener(state => {
//     console.log("Connection type", state.type);
//     isConnectedNet = state.isConnected
//     console.log("Is connected?", state.isConnected);
//   });
  
//   // Unsubscribe
//   unsubscribe();



// 普通请求不需要传递token
export const post = (path, params) => {
    return request(config.baseURL + path, params, 'POST')
}

// 需要传token的请求
export const AuthPost = (path,params)=>{
    return new Promise((resolve,reject)=>{
        getToken().then(token=>{
            let headers = {
                'accessToken':token,
                'Authorization':'Bearer ' + token
            }
            request(config.baseURL + path,params,'POST',headers).then(resolve).catch(reject)
        }).catch(reject)
    })
}

export const AuthPhonePost = (path,params)=>{
    return new Promise((resolve,reject)=>{
        getToken().then(token=>{
            console.log(token)
            let headers = {
                'accessToken':token,
                'Authorization':'Bearer ' + token
            }
            isBindPhone().then(res=>{
                request(config.baseURL + path,params,'POST',headers).then(resolve).catch(reject)
            }).catch(reject)
        }).catch(reject)
    })
}

// 需要
export const get = (path, params) => {
    return request(config.baseURL + path, params, 'GET')
}

export const AuthGet = (path,params)=>{
    return new Promise((resolve,reject)=>{
        getToken().then(token=>{
            let headers = {
                'accessToken':token,
                'Authorization':'Bearer ' + token
            }
            request(config.baseURL + path,params,'GET',headers).then(resolve).catch(reject)
        }).catch(reject)
    })
}

export const request = (url, params = {}, method = 'POST',headers={}) => {
    params.channel = config.channel
    params.subChannelNo = config.subChannelNo
    return new Promise((resolve, reject) => {
            headers['Content-Type'] = 'application/x-www-form-urlencoded'
            let body = params
            if (method == 'POST') {
                headers['Content-Type'] = 'application/json'
            }
            if (headers['Content-Type'] == 'application/json') {
                body = JSON.stringify(body)
            } else {
                let result = []
                for (let key in body) {
                    result.push(`${key}=${body[key]}`)
                }
                body = result.join('&')
            }

            fetch(url,{
                method: method,
                headers: headers,
                body: body,
            }).then(res => res.json()).then(res => {
              
                // return
                if(res.code==201){
                    resolve(res.body)
                }else if(res.exception && (res.exception.errorCode==1005||res.exception.errorCode==1006)){
                    reject(res)
                    AsyncStorage.setItem("token",'')
                    Actions.replace("login")
                 }else{
                   
                    if(!res.exception){
                        reject(res)
                        return
                    }
                   
                    Toast.show({
                        text: handleErrorMsg(res.exception.message),
                        buttonText: 'Okay',
                        duration: 1500,
                        position: "top",
                        type: "danger"

                    })
                    reject(res)
                }
                //2.提示异常
                //3.正确返回
            }).catch(error => {
                console.log(err)
                Toast.show({
                    text: "请检查手机网络",
                    buttonText: 'Okay',
                    duration: 1500,
                    position: "bottom",
                    type: "danger"
                })
                reject(error)
            })
    })
}

export const getToken = ()=>{
    return new Promise((resolve,reject)=>{
        AsyncStorage.getItem("token",(error,result)=>{
          
            if(result){
                resolve(result)
            }else{
                reject(error)
                Actions.replace("packageB")
            }
        })
    })
}

export const isBindPhone = ()=>{
    return new Promise((resolve,reject)=>{
        AsyncStorage.getItem("bindPhoneStatus",(error,result)=>{
            if(result==='true'){
                resolve(result)
            }else{
                reject(error)
                Actions.replace("packageB")
            }
        })
    })
}

