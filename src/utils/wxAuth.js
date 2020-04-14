import * as WeChat from 'rn-wechat-fix';
WeChat.registerApp('wxcdab02a726a1a3bc');
export const sendwxAuthRequest = ()=>{
    return WeChat.sendAuthRequest('snsapi_userinfo','kmyd')
}

export const isInstallWx = ()=>{
   return WeChat.isWXAppInstalled()
}

