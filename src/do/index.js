import {checkFilePermission,requestFilePermisson} from './api/permission'
import share from './api/share'
import test from './api/test'
import {Actions} from 'react-native-router-flux'
import {sw,sh} from './api/screenAdapter'
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
const ProgressImage = createImageProgress(FastImage);
import {openPicker,openCamera} from './api/imagePicker';
import measureUI from './api/measureUI';
import { 
    AdMobBanner, 
    AdMobInterstitial, 
    PublisherBanner,
    AdMobRewarded
  } from 'react-native-admob'

export {


    /** 带缓存功能的图片组件*/
    FastImage,
    /**带进度条的图片组件*/
    ProgressImage,
    AdMobBanner,
    PublisherBanner

}

/**
 * 核心服务层 
 */
export default{
    /**检查文件权限 */
    checkFilePermission,
    /** 请求文件权限*/
    requestFilePermisson,
    /** 分享方法集合*/
    ...share,
    /** 校验数据格式集合*/
    ...test,
    /** 页面跳转路由*/
    ...Actions,

   /** 适配屏幕宽度*/
    sw,
    /** 适配屏幕高度*/
    sh,
    openPicker,
    openCamera,
    measureUI
}
