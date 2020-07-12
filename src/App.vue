<template>
  <div id="app">
    <div>新手引导一</div>
    <e-guide-layer :currentIndex="guideActiveIndex" :guideList="guideList" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      guideActiveIndex: 1,
      guideList: [
        {
          text: 'step1',
          clickHandle: () => {
            alert('step1')
            console.log(this)
          }
        },
        {
          text: 'step2',
          clickHandle: () => {
            alert('step2')
            console.log(this)
            this.guideActiveIndex += 1
          }
        },
        {
          text: 'step3',
          clickHandle: () => {
            alert('step3')
            console.log(this)
            this.guideActiveIndex += 1
          }
        }
      ]
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
