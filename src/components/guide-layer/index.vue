<script>
import GuideItem from './GuidItem'
export default {
  name: 'e-guide-layer',
  data() {
    return {
      current: 0
    }
  },
  methods: {},
  props: {
    currentIndex: {
      type: Number,
      default: 0
    },
    guideList: {
      type: Array,
      default: () => []
    },
    zIndex: {
      type: Number,
      default: 999
    }
  },
  watch: {
    currentIndex: {
      handler: function(newVal) {
        if (newVal) {
          this.current = newVal
        }
      },
      immediate: true
    }
  },
  render() {
    let currentIndex = this.current
    let currentActiveGuideItemData = this.guideList[currentIndex]
    // console.log('currentIndex', currentIndex, currentActiveGuideItemData)
    return (
      <div>
        {currentActiveGuideItemData && (
          <GuideItem
            key={currentIndex}
            targetDom={currentActiveGuideItemData.targetDom}
            confirmBtnText={currentActiveGuideItemData.confirmBtnText}
            direction={currentActiveGuideItemData.direction}
            vOn:confirm={currentActiveGuideItemData.clickHandle}
          >
            {currentActiveGuideItemData.render &&
              currentActiveGuideItemData.render()}
          </GuideItem>
        )}
      </div>
    )
  }
}
</script>
