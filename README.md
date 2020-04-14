安装依赖包

```
yarn
```

进入ios工程
```
cd ios
pod install
```
使用xcode 打开项目 点击"运行按钮"

进入安卓工程
```
a.同步依赖包
b.选择真机调试
```
真机调试步骤详情如下

安卓真机调试
https://www.cnblogs.com/developer-wang/p/6719555.html 安装adb
https://www.jianshu.com/p/3480d4b27cfe 
启动真机调试 adb reverse tcp:8081 tcp:8081



安装插件包含

react-native-image-zoom-viewer@2.2.27
https://github.com/ascoders/react-native-image-viewer?spm=a2c4e.10696291.0.0.604719a4WwwEFP
















1.图片缩放
cover模式只求在显示比例不失真的情况下填充整个显示区域。可以对图片进行放大或者缩小，超出显示区域的部分不显示， 也就是说，图片可能部分会显示不了。
contain模式是要求显示整张图片, 可以对它进行等比缩小, 图片会显示完整,可能会露出Image控件的底色。 如果图片宽高都小于控件宽高，则不会对图片进行放大。
stretch模式不考虑保持图片原来的宽,高比.填充整个Image定义的显示区域,这种模式显示的图片可能会畸形和失真。
center模式, contain模式基础上支持等比放大。


待解决问题

1.如何获取节点的坐标
2.如何实现动画弹窗
3.如何获取顶部的高度
4.如何获取底部tabbar高度

填坑记录

1. Swiper组件 进入页面不渲染数据 需要滑动才渲染的bug？
在swiper组件增加这个属性 removeClippedSubviews={false}

[!] Invalid `Podfile` file: cannot load such file -- /Users/kz/Documents/ReactNative项目/React-Native/node_modules/@react-native-community/cli-platform-ios/native_modules.

先进入主目录执行 yarn
之后进入iOS 目录 指定pod install

2. 微信分享接入请参看这个坑
https://github.com/puti94/react-native-wechat
跳转不到微信小程序 请参考上面的文档

3.运行npm run ios 报错
PCH was compiled with module cache path '/Users/tyler/workspace/html5space/HappyTime/ios/build/ModuleCache/HST39TUTS9TS', but the path is currently '/Users/tyler/workspace/webstormspac/react-native-template/ios/build/ModuleCache/HST39TUTS9TS'

参考 https://blog.csdn.net/jiangbo_phd/article/details/54016242

4.swper OnIndexChange 不触发

参考 https://www.jianshu.com/p/a46a57484946

当数据没有获取到的情况的下不要渲染swiper 否则会有问题

{this.state.goodsInfo.mainImgs.length?this.renderSwiper():(<></>)}

5.TextInput失去焦点触发事件？ 

https://blog.csdn.net/weixin_41717785/article/details/81318212

6.如何将本地图片保存至相册

7.如何使用transform 进行数据转换

transform:[{translateX:'0'}]

8.计算元素的位置和高度
<TouchableOpacity ref={'text'+index}>
this.refs.text1.measure((x,y,width,height,left,top) => {
        console.log(x,y,width,height,top,height)
        this.state.selectedMenuWidth = width
})

9.如何保证图片按照实际比例展示
 获取数据后计算图片显示在页面的的宽和高
 let list = new Array(this.state.goodsInfo.appImgs.length)
            this.state.goodsInfo.appImgs.map((item,index) => {
                Image.getSize(item, (width, height) => {
                    let screenWidth = Dimensions.get('window').width
                    console.log(screenWidth,'screenWidth')
                    list[index]= Math.floor(1.0 * screenWidth / width * height)
                    this.setState({
                     textImageLayout: list
         })          
    })
})

10.项目用到第三方react-native-swiper(1.5.13)，遇到个问题，就是轮播要显示的第一张图片，会先最后一张跳到第一张来，但是重新滑动就恢复

12.文字超长省略
在Text 添加属性 numberOfLines

13.react-native-swiper的一个坑：ViewPagerAndroid has been removed
yarn add react-native-swiper@nightly

14.安卓打包出现错误 Duplicate resources

在工程目录中app/src/main/res 删除drawable-xx等图片资源文件 和 raws文件

15.TextInput 不能输入汉字,会出现闪烁
是由于reactnative 数据更新的时候,会渲染所有的元素,只要检测到两次数据不一致的时候才去更新即可修复次问题
```
class MyTextInput extends PureComponent {
  shouldComponentUpdate(nextProps){
    return Platform.OS !== 'ios' || this.props.value !== nextProps.value;
  }
  render() {
    return <TextInput {...this.props} />;
  }
}
```

16.签名不一致 微信平台和应用签名不一致?

请参考 https://blog.csdn.net/xmx5166/article/details/90723722

17.安卓上图片加载不出来？
由于android 9.0以上默认只支持安全域名下的资源下载,请使用下面的方式
SDK 28 （Android 9.0） 图片不能正常加载方案：
```
1. 在res目录下创建xml文件夹，在xml下创建network_security_config.xml文件
    <?xml version="1.0" encoding="utf-8"?>  <network-security-config> <base-config cleartextTrafficPermitted="true" />     </network-security-config>
2. 在AndroidManifest文件中Application标签中配置
android:networkSecurityConfig="@xml/network_security_config"
```

18.修改顶部状态栏的颜色


19.监听页面刷新
componentDidMount() {

        // 添加监听
        this.viewDidAppear = this.props.navigation.addListener(
            'didFocus',
            (obj)=>{
                console.log(obj)
            }
        )
    }

    componentWillUnmount() {
        // 移除监听
        this.viewDidAppear.remove();
    }

20.安卓加载gif图  在安卓工程中添加下面的依赖包

```
dependencies {
  // If your app supports Android versions before Ice Cream Sandwich (API level 14)
  implementation 'com.facebook.fresco:animated-base-support:1.10.0'
  // For animated GIF support
  implementation 'com.facebook.fresco:animated-gif:1.12.0'
  // For WebP support, including animated WebP
  implementation 'com.facebook.fresco:animated-webp:1.10.0'
  implementation 'com.facebook.fresco:webpsupport:1.10.0'
  // For WebP support, without animations
  implementation 'com.facebook.fresco:webpsupport:1.10.0'
}
```

如果报错`Failed to resolve: com.facebook.fresco:animated-base-support:1.10.0`
请将 `implementation 'com.facebook.fresco:animated-base-support:1.10.0'` 修改为 `implementation 'com.facebook.fresco:animated-base-support:+'`

如果还加载不出来
请替换下面依赖
implementation 'com.facebook.fresco:animated-gif:+'`

21.pod install 报错
[!] Error installing libwebp
[!] /usr/bin/git clone https://chromium.googlesource.com/webm/libwebp /var/folders/tc/sml8zmc53p9g1czc8cxy_hpr0000gn/T/d20191224-41406-1lgx5tm --template= --single-branch --depth 1 --branch v1.0.3


检测srcollview页面有没有触底



_contentViewScroll = (e) => {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight + 50 >= contentSizeHeight) {
            // Console.log('上传滑动到底部事件')
            this._pullUpLoading()
        }
 }


 flatList 开启  //  stickyHeaderIndices={[1]} 吸顶效果 变得卡顿
 由于使用react-native 自带的image 导致的
 解决 一定要使用 import Image from 'react-native-fast-image'; 


## 使用的插件

- react-native-fast-image
- react-native-image-progress


轮播图参考
https://github.com/gusgard/react-native-swiper-flatlist

https://www.npmjs.com/package/react-native-gallery-swiper#clapper-example-project

npm install --save react-native-loading-view

安卓真机调试
https://www.cnblogs.com/developer-wang/p/6719555.html 安装adb
https://www.jianshu.com/p/3480d4b27cfe 
启动真机调试 adb reverse tcp:8081 tcp:8081


读写权限已经申请成功 用户已经点击同意 图片还是下载不到本地？
这种情况要修改由于目标sdk版本过高导致 将目标sdk版本降低即可
 targetSdkVersion = 25 


 [!] Invalid `Podfile` file: A JSON text must at least contain two octets!.

 修改 package.json 的项目名称即可 "name": "rn-template",
 












