# webpack的splitChunks

`splitChunks`有一个默认的配置

```js
optimization: {
    splitChunks: {
      /*
       * 拆分模块的范围. 方法或字符串
       * 方法则会传入一个chunk对象 该对象包含chunk信息
       * *根据返回的布尔值来判断是否处于范围内
       * 字符串的值有三种
       * async 只从异步加载的进行拆分, 比如 import()
       * initial 只从入口进行拆分
       * all 包括以上两种
       */
      chunks: 'async',
      // 引用的模块被引用次数超过这个值, 就会被抽出来打包.
      // 这个值设置完后, 还需要额外设置cacheGroups中的值才会起作用.
      // minSize同理
      minChunks: 1,
      minSize: 30000,
      // 以下两个都是用来约束的. 一个是入口, 一个是异步.
      // 拆分出来的包如果很多的话, 会导致请求数过多.
      // 通过该值可以约束最终的拆包数量.
      maxInitialRequests: 3,
      maxAsyncRequests: 5,
      // 分隔符
      automaticNameDelimiter: '~',
      name: true,
      // 核心配置. 配置优先考虑这个里面的
      // 找不到属性后, 再考虑同级的属性.
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  }
```