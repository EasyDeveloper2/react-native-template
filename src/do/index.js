import {checkFilePermission,requestFilePermisson} from './permission'
import methods from '../service/methods'
import share from '../utils/share'
import test from '../utils/test'
import utils from '../utils/index'
import {Actions} from 'react-native-router-flux'
import {sw,sh} from '../utils/screenAdapter'
import FastImage from 'react-native-fast-image';
import { createImageProgress } from 'react-native-image-progress';
import FitImage from '../components/FitImage';
const ProgressImage = createImageProgress(FastImage);

export {
    checkFilePermission,
    /** 请求文件权限*/
    requestFilePermisson,
    /** 服务器请求集合 */
    methods,
    /** 分享方法集合*/
    share,
    /** 校验数据格式集合*/
    test,
    /** 页面跳转路由*/
    Actions,
    /** 适配屏幕宽度*/
    sw,
    /** 适配屏幕高度*/
    sh,
    /** 带缓存功能的图片组件*/
    FastImage,
    /**带进度条的图片组件*/
    ProgressImage,
    /**自适应的图片组件*/
    FitImage,
    /**处理数据工具*/ 
    utils
}

/**
 * 核心服务层 
 */
export default{
    /**检查文件权限 */
    checkFilePermission,
    /** 请求文件权限*/
    requestFilePermisson,
    /** 服务器请求集合 */
    methods,
    /** 分享方法集合*/
    share,
    /** 校验数据格式集合*/
    test,
    /** 页面跳转路由*/
    Actions,
   /** 适配屏幕宽度*/
    sw,
    /** 适配屏幕高度*/
    sh,
    /** 带缓存功能的图片组件*/
    FastImage,
    /** 带进度条的图片组件*/
    ProgressImage,
     /**自适应的图片组件*/
    FitImage,
    /**处理数据工具类*/
    utils
}
