
import { post, AuthPost, AuthGet, get, AuthPhonePost } from './request'
import Api from './api';
import config from '../config/config';

/**
 * 登录发送验证码
 * @param {*}
 *
 * @return
 */
export let phoneLogin = (params) => {
    return post(Api.phoneLogin, params)
}


export default {
    phoneLogin 
}

