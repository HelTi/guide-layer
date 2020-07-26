# e-guide-layer
> 基于vue jsx的新手引导层组件，只需要配置一定的参数即可

## 安装
```js
npm install e-guide-layer --save
```
## 使用
```js
import eGuideLayer from 'e-guide-layer'

Vue.use(eGuideLayer)
```
### 基础代码演示
```js
<e-guide-layer
      :currentIndex.sync="guideActiveIndex"
      :guideList="guideList"
/>

export default {
    data() {
    return {
      guideActiveIndex: 0,
      guideList: [  // 配置
        {
          text: '下一步',
          targetDom: '.step1',
          clickHandle: () => {
            this.guideActiveIndex = 1
            console.log(this)
          },
        },
        {
          text: '下一步',
          targetDom: '.step2',
          clickHandle: () => {
            this.guideActiveIndex = 2
            console.log(this)
          }
        },
        {
          text: '知道了',
          targetDom: '.step3',
          direction: 'down',
          clickHandle: () => {
            this.guideActiveIndex = 3
            console.log(this)
          }
        }
      ]
    }
  },

  methods: {

  },
};

```

## 配置说明


