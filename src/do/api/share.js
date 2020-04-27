
import RNFetchBlob from 'rn-fetch-blob';
import CameraRoll from "@react-native-community/cameraroll";
import * as WeChat from 'rn-wechat-fix';
import Config from '../../config/config';
import {Platform} from 'react-native';
WeChat.registerApp('wxcdab02a726a1a3bc');
import Share from 'react-native-share';



/**
 *  下载文件
 *  @param {String} url
 */
const downloadFile = (url)=>{
  return new Promise((resolve,reject)=>{
   
    RNFetchBlob
    .config({
        // this is much more performant.
         fileCache: true,
         appendExt:"jpg"
    })
    .fetch('GET', url, {
        //some headers ..
    })
    .then((res) => {
         resolve(res.path())
    }).catch(err=>{
        console.warn(err)
        reject(err)
    })
  })
}

const getBase64ByUrl = async (url)=>{
  
    return new Promise((resolve,reject)=>{
   
        RNFetchBlob
        .config({
            // this is much more performant.
             fileCache: true,
             appendExt:"png"
        })
        .fetch('GET', url, {
            //some headers ..
        })
        .then((res) => {
             resolve(res.base64())
        }).catch(err=>{
            console.warn(err)
            reject(err)
        })
      })
    
   
  }




/**
 *  检测是否安装微信客户端(名字起Rita了)
 */
const isInstallWx = (url)=>{
  return new Promise((resolve,reject)=>{
    WeChat.isWXAppInstalled().then((isInstalled) => {
        if (isInstalled) {
            resolve()
        }else{
         
            reject('您没有安装微信客户端,请安装后尝试')
        }
    })
  })
}

/**
 *  检测是否安装微信客户端(名字起Rita了)
 */
const isInstall = ()=>{
    return new Promise((resolve,reject)=>{
      WeChat.isWXAppInstalled().then((isInstalled) => {
          if (isInstalled) {
              resolve(isInstalled)
          }
      }).catch(reject)
    })
}

/**
 *  将图片保存在本地
 *  @param {String} url 分享图片地址
 */
const saveLocal = (url) => {
    return new Promise((resolve, reject) => {
        if (!url) {
            alert("请传参数url")
        }
            downloadFile(url).then(path=>{
                if(Platform.OS=="ios"){
                    console.log(path)
                    CameraRoll.saveToCameraRoll(path).then(resolve).catch(reject)
                }else{
                    
                    CameraRoll.saveToCameraRoll(path).then(resolve).catch(reject)
                
                }
            })
    })
}



/**
 *  分享图片给朋友
 *  @param {String} url 分享图片地址
 */
const  shareImageToFriend = ({url,title}) => {
    if(!url){
        alert("请填写分享的url地址")
        return
    }
    return new Promise((resolve, reject) => {
        if (!url) {
            alert("请传参数url")
        }
        isInstallWx().then((res)=>{
            downloadFile(url).then(path=>{
               
                WeChat.shareToSession({
                    type: 'imageFile',
                    title: title,
                    description: '',
                    mediaTagName: '',
                    messageAction: undefined,
                    messageExt: undefined,
                    imageUrl: 'file://'+ path// require the prefix on both iOS and Android platform
                  }).then((error)=>{
                      resolve()
                  }).catch(err=>{
                      reject && reject()
                  });
            }).catch(err=>{
                reject && reject()
            })
        })
  })
}

/**
 *  将图片分享朋友圈
 *  @param {String} url 分享图片地址
 */
const shareImageToTimeline = ({url,title}) => {
    if(!url){
        alert("请填写分享的url地址")
        return
    }
    return new Promise((resolve, reject) => {
        if (!url) {
            alert("请传参数url")
        }
        isInstallWx().then((res)=>{
            downloadFile(url).then(path=>{
                  WeChat.shareToTimeline({
                    type: 'imageFile',
                    title: title,
                    description: '',
                    mediaTagName: '',
                    messageAction: undefined,
                    messageExt: undefined,
                    imageUrl:`file://${path}` //'file://'+ path  require the prefix on both iOS and Android platform
                  }).then((res)=>{
                    resolve && resolve()
                  }).catch(err=>{
                    reject && reject(err)
                  });
            }).catch(err=>{
                reject && reject()
            })
        })
    })
}

/**
 * 分享小程序卡片
 *  @param {String} webpageUrl 兼容低版本小程序 放一个H5地址
 *  @param {String} path 小程序的路径 /pages/index/index?name=k
 *  @param {String} title 小程序标题
 *  @param {String} thumbImage 缩略图
 */
const shareMiniProgram = ({webpageUrl="",path,title,thumbImage}) => {
    let  programType = 0
    if(Config.wxEnvironment=='release'){
        programType = 0
    }else if(Config.wxEnvironment=='trial'){
        programType = 2
    }else{
        programType = 1
    }
    return new Promise((resolve,reject)=>{
        isInstallWx().then((res)=>{
            downloadFile(thumbImage).then(imagePath=>{
                WeChat.shareToSession({
                    type: 'mini',
                    title: title,
                    thumbImage: `file://${imagePath}`, // thumbImage 直接使用网络图片模糊
                    description: "",
                    webpageUrl: "https://www.baidu.com",
                    userName: 'gh_9be32defe1eb',//小程序原始ID
                    path: path,  //小程序页面路径
                    miniProgramType: programType, //0-发布，1-开发，2-测试。好像是这个，不是很确定
                    withShareTicket: true,
                }).then((res)=>{
                    resolve && resolve(res)
                }).catch((clickErr)=>{
                    reject && reject(clickErr)
                })
            })
           
        })
    })
}

/**
 *  App打开小程序
 *  @param {String} path 小程序的路径 /pages/index/index?name=k
 */
const launchMini = ({path})=>{
    let  programType = 0
    if(Config.wxEnvironment=='release'){
        programType = 0
    }else if(Config.wxEnvironment=='trial'){
        programType = 2
    }else{
        programType = 1
    }

  return WeChat.launchMini({
    userName:'gh_9be32defe1eb',
    miniProgramType:programType,// {Integer} 拉起小程序的类型. 0-正式版 1-开发版 2-体验版
    path:path
   })
}
/**
 * 分享新闻给微信好友 news
 * @param {*}{
 *    webpageUrl 链接地址
 *    thumbImage 缩略图地址
 *    description 描述
 * }
 */
const shareNewsToFriend=({webpageUrl='',thumbImage,description,title})=>{
   return new Promise((resolve,reject)=>{
    downloadFile(thumbImage).then(path=>{
        WeChat.shareToSession({
            type:'news',
            title:title,
            webpageUrl:webpageUrl,
            thumbImage:`file://${path}`, 
            description:description
        }).then(resolve).catch(err=>{
            reject && reject()
        })
    })
   }) 
}

/**
 * 分享新闻到朋友圈 news
 * @param {*}{
 *    webpageUrl 链接地址
 *    thumbImage 缩略图地址
 *    description 描述
 * }
 */
const shareNewsToTimeline=({webpageUrl='',thumbImage,description,title})=>{
    return new Promise((resolve,reject)=>{
     downloadFile(thumbImage).then(path=>{
         WeChat.shareToTimeline({
             type:'news',
             title:title,
             webpageUrl:webpageUrl,
             thumbImage:`file://${path}`,
             description:description
         }).then(resolve).catch(err=>{
            reject && reject(err)
         })
     })
    }) 
 }

 /**
  *  分享多张图片至微信 
  *  @param {Array} list 图片地址数组
  */
 const shareMultiImagesToWx= async ({urls,title})=>{


 
   return new Promise((resolve,reject)=>{
       let options = {
        urls: urls,
        type: 'image/*',
        message: title,
        title: title,
        subject: title,
        social: Share.Social.WHATSAPP,
        whatsAppNumber: "8618817572718",
        excludedActivityTypes: ['generic','email','sms','messenger'],
        failOnCancel: true,
        showAppsToView: true,
       }
    Share.open(options).then(resolve).catch(reject)
   })
 }

 const openWXApp = ()=>{
    return WeChat.openWXApp()
 }







export default {
    saveLocal,
    shareImageToFriend,
    shareImageToTimeline,
    shareMiniProgram,
    launchMini,
    isInstall,
    shareNewsToFriend,
    shareNewsToTimeline,
    shareMultiImagesToWx,
    openWXApp
}