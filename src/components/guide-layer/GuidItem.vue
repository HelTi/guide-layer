<template>
  <div class="guide-item-wrapper">
    <div class="step-top" :style="stepTopStyle"></div>
    <div ref="step_bottom" class="step-bottom" :style="stepBottomStyle">
      <slot>
        <template v-if="direction === 'down'">
          <div class="step-bottom-btn" @click="confirmHandle">
            {{ confirmBtnText }}
          </div>
          <img
            class="guide-img"
            style="transform: rotateX(180deg);"
            :style="guideImgStyle"
            :src="guideImgSrc"
          />
        </template>
        <template v-else>
          <img class="guide-img" :style="guideImgStyle" :src="guideImgSrc" />
          <div class="step-bottom-btn" @click="confirmHandle">
            {{ confirmBtnText }}
          </div>
        </template>
      </slot>
    </div>
  </div>
</template>

<script>
const guideImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAYwAAACQCAYAAAAbWlweAAAAAXNSR0IArs4c6QAAAH5lWElmTU0AKgAAAAgAAwESAAMAAAABAAEAAAExAAIAAAAiAAAAModpAAQAAAABAAAAVAAAAABBZG9iZSBQaG90b3Nob3AgQ0MgMjAxOCAoV2luZG93cykAAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAYygAwAEAAAAAQAAAJAAAAAALyCqLAAABBVpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDUuNC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iCiAgICAgICAgICAgIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIgogICAgICAgICAgICB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIKICAgICAgICAgICAgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIj4KICAgICAgICAgPHhtcE1NOkluc3RhbmNlSUQ+eG1wLmlpZDpEOEQzRkFBQ0EwOEIxMUVBOENFM0QwMkQ5OEExQjg1QjwveG1wTU06SW5zdGFuY2VJRD4KICAgICAgICAgPHhtcE1NOkRlcml2ZWRGcm9tIHJkZjpwYXJzZVR5cGU9IlJlc291cmNlIj4KICAgICAgICAgICAgPHN0UmVmOmluc3RhbmNlSUQ+eG1wLmlpZDpEOEQzRkFBQUEwOEIxMUVBOENFM0QwMkQ5OEExQjg1Qjwvc3RSZWY6aW5zdGFuY2VJRD4KICAgICAgICAgICAgPHN0UmVmOmRvY3VtZW50SUQ+eG1wLmRpZDpEOEQzRkFBQkEw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'
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
    },
    guideImgSrc: {
      type: String,
      default: guideImg
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getTargetDomStyle()
    })
  },
  computed: {
    stepTopStyle() {
      if (this.guideDomInfo) {
        // console.log('stepTopStyle', this.setGuideDomStyle(this.guideDomInfo))
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
          // console.log('step_bottom_info', step_bottom_info)
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
      // console.log('guideDomInfo', this.guideDomInfo)
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
