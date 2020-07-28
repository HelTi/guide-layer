<template>
  <div id="app">
    <div class="step1">新手引导1</div>
    <div style="height:300px;margin-top:20px;">
      这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容这是内容
    </div>
    <div class="step2">引导2</div>
    <div class="step3">点击领红包</div>
    <e-guide-layer
      v-if="showGuide"
      :current-index.sync="guideActiveIndex"
      :guide-list="guideList"
    />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      guideActiveIndex: 0,
      guideList: [
        {
          confirmBtnText: '下一步',
          targetDom: '.step1',
          clickHandle: () => {
            this.guideActiveIndex = 1
            console.log(this)
          }
        },
        {
          confirmBtnText: '下一步',
          targetDom: '.step2',
          clickHandle: () => {
            this.guideActiveIndex = 2
            console.log(this)
          },
          render: () => {
            return (
              <div
                style="background-color:#fff;"
                onClick={this.step1ClickHandle}
              >
                自定义引导层区域
              </div>
            )
          }
        },
        {
          confirmBtnText: '知道了',
          targetDom: '.step3',
          direction: 'down',
          clickHandle: () => {
            this.guideActiveIndex = 3
            console.log(this)
          }
        }
      ],
      showGuide: true
    }
  },
  methods: {
    step1ClickHandle() {
      alert('step1ClickHandle')
      this.guideActiveIndex += 1
    }
  }
}
</script>

<style lang="scss">
#app {
  height: 100vh;
  position: relative;
  padding: 20px;

  .step1 {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .step2 {
    height: 50px;
    width: 50px;
    border-radius: 25px;
    background: #ce6349;
    line-height: 50px;
    text-align: center;
    color: #ffffff;
  }

  .step3 {
    position: fixed;
    right: 20px;
    bottom: 50px;
    width: 160px;
    line-height: 30px;
    height: 30px;
    background: #ddeedd;
    border-radius: 8px;
    padding-left: 10px;
    color: #ce6349;
  }
}
</style>
