import ImagePicker from 'react-native-image-crop-picker';

/**
 * 从相册中选择
 * 'photo', 'video', or 'any' 
 */
export let openPicker = ({width=100,height=100,count=99,cropping=false,type='any'})=>{
    return new Promise((resolve,reject)=>{
        if(count==0){
            reject('count==0')
        }
        if(type!='video'){
            if(count==1){
                ImagePicker.openPicker({
                    width: width,
                    height: height,
                    cropping: cropping
                  }).then(image => {
                    resolve([image])
                  }).catch(error=>{
                      reject(error)
                  });
            }else{
                ImagePicker.openPicker({
                    multiple: true
                  }).then(images => {
                    resolve(images)
                  }).catch(error=>{
                    reject(error)
                });
            }
        }else{
            ImagePicker.openPicker({
                mediaType: "video",
              }).then((video) => {
                resolve([video])
              }).catch(error=>{
                reject(error)
            });
        }

        
    })
}


export let openCamera = ({width=100,height=100,count=1,cropping=false,type='video'})=>{
    return new Promise((resolve,reject)=>{
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: cropping,
          }).then(image => {
            resolve([image])
          }).catch(error=>{
              reject(error)
          });
    })
}