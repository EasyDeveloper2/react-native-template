import {
    findNodeHandle,
    UIManager
} from 'react-native';
 
/**
 * 主动获取组件的布局信息 
 * @parma {*} ref 组件的引入
 */
function measure(ref) {
        const handle = findNodeHandle(ref); 
        return new Promise((resolve) => {
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
                resolve({
                    x,
                    y,
                    width,
                    height,
                    pageX,
                    pageY
                });
            });
        });
 }

 export default {
    measure
 }