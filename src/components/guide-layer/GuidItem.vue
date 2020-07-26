<template>
  <div class="guide-item-wrapper">
    <div class="step-top" :style="stepTopStyle"></div>
    <div ref="step_bottom" class="step-bottom" :style="stepBottomStyle">
      <template v-if="direction === 'down'">
        <div class="step-bottom-btn" @click="confirmHandle">
          {{ confirmBtnText }}
        </div>
        <img
          class="guide-img"
          style="transform: rotateX(180deg);"
          :style="guideImgStyle"
          src="@/assets/guide.png"
        />
      </template>
      <template v-else>
        <img
          class="guide-img"
          :style="guideImgStyle"
          src="@/assets/guide.png"
        />
        <div class="step-bottom-btn" @click="confirmHandle">
          {{ confirmBtnText }}
        </div>
      </template>
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
    },
    padding: {
      type: Number,
      default: 6
    },
    guideImgHeight: {
      type: String,
      default: '30px'
    },
    direction: {
      // 展示在目标节点到上面还是下面
      type: String,
      default: 'up'
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
        let domStyleObj = {
          top: top + height + 10 + 'px',
          left: left + 30 + 'px',
          zIndex: this.$parent.$props.zIndex + 2
        }
        if (this.direction === 'down') {
          let step_bottom_info = this.$refs.step_bottom.getBoundingClientRect()
          console.log('step_bottom_info', step_bottom_info)
          domStyleObj.top = top - step_bottom_info.height - 10 + 'px'
        }

        return domStyleObj
      } else {
        return null
      }
    },
    guideImgStyle() {
      return {
        height: this.guideImgHeight
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
      let borderRadius = getComputedStyle(dom).borderRadius
      let info = dom.getBoundingClientRect()
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
      // 设置指向dom的节点位置
      let border_radius = 0
      if (borderRadius) {
        let bdr = borderRadius.split('px')
        border_radius = bdr[0] * 1
      }

      let styleObg = {
        width: width + this.padding + 'px',
        height: height + this.padding + 'px',
        top: top - this.padding / 2 + 'px',
        left: left - this.padding / 2 + 'px',
        zIndex: this.$parent.$props.zIndex + 1,
        borderRadius: border_radius + this.padding / 2 + 'px'
      }

      return styleObg
    },
    confirmHandle() {
      this.$parent.current++
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
}

.step-bottom {
  position: fixed;
  z-index: 10001;
  width: 220px;
  .step-bottom-btn {
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
