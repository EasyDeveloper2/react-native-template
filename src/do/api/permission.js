
import {PermissionsAndroid,Platform} from 'react-native';

export let checkFilePermission = ()=>{
     return new Promise((resolve,reject)=>{
         if(Platform.OS=='ios'){
             resolve(true)
         }else{
             PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(res=>{
                if(res){
                    resolve(true)
                }else{
                    reject() 
                }
             }).catch(reject)
         }
     })
}

export let requestFilePermisson = ()=>{
    const permissions = [
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
    ]
    return new Promise((resolve,reject)=>{
        if(Platform.OS=='ios'){
            resolve(true)
        }else{
            PermissionsAndroid.requestMultiple(
                permissions
            ).then(res=>{
               if(res['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' && res['android.permission.WRITE_EXTERNAL_STORAGE']==='granted') {
                   resolve(true)
               }else{
                reject(res)
               }
            }).catch(reject)

        }
    })
}