<template>
  <div class="guide-item-wrapper">
    <div class="step-top" :style="stepTopStyle"></div>
    <div class="step-bottom" :style="stepBottomStyle">
      <div class="btn" @click="confirmHandle">{{ confirmBtnText }}</div>
    </div>
  </div>
</template>

<script>
import { isElement } from '@/utils'
export default {
  name: 'e-guide-item',
  data() {
    return {
      guideDomInfo: null
    }
  },
  props: {
    targetDom: {
      type: String,
      default: null
    },
    confirmBtnText: {
      type: String,
      default: '下一步'
    }
  },
  mounted() {
    console.log('targetDom', this.targetDom)
    this.$nextTick(() => {
      this.getTargetDomStyle()
    })
  },
  computed: {
    stepTopStyle() {
      if (this.guideDomInfo) {
        console.log('stepTopStyle', this.setGuideDomStyle(this.guideDomInfo))
        return this.setGuideDomStyle(this.guideDomInfo)
      } else {
        return null
      }
    },
    stepBottomStyle() {
      if (this.guideDomInfo) {
        let { top, left, height } = this.guideDomInfo
        return {
          top: top + height + 10 + 'px',
          left: left + 30 + 'px',
          zIndex: this.$parent.$props.zIndex + 2
        }
      } else {
        return null
      }
    }
  },
  methods: {
    getTargetDomStyle() {
      // 获取要指向页面dom的节点
      let domInfo = this.getDomInfo(this.targetDom)
      this.guideDomInfo = domInfo
      console.log('guideDomInfo', this.guideDomInfo)
    },
    getDomInfo(className) {
      // 获取dom节点的信息
      let dom
      if (isElement(className)) {
        dom = className
      } else {
        dom = document.querySelector(className)
      }
      console.log('dom', dom)
      console.log('style', getComputedStyle(dom))
      let borderRadius = getComputedStyle(dom).borderRadius
      let info = dom.getBoundingClientRect()
      console.log('info', info)
      let { bottom, top, left, right, height, width } = info
      return {
        bottom,
        top,
        left,
        right,
        height,
        width,
        borderRadius
      }
    },
    setGuideDomStyle({ top, left, height, width, borderRadius }) {
      let styleObg = {
        width: width + 'px',
        height: height + 'px',
        top: top + 'px',
        left: left + 'px',
        zIndex: this.$parent.$props.zIndex + 1,
        borderRadius: borderRadius ? borderRadius : null
      }
      return styleObg
    },
    confirmHandle() {
      console.log(this.$parent)
      this.$parent.currentIndex++
      // 点击确定的自定义事件
      this.$emit('confirm')
    }
  }
}
</script>
<style lang="scss" scoped>
.step-top {
  position: fixed;
  top: 0;
  left: 0;
  box-shadow: 0 0 0 3000px rgba(0, 0, 0, 0.7);
  box-sizing: content-box;
  z-index: 10000;
  padding: 2px;
}

.step-bottom {
  position: fixed;
  z-index: 10001;
  width: 220px;
  .text {
    width: 100%;
  }
  .btn {
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    border-radius: 15px;
    background: #ffffff;
  }
}
</style>
