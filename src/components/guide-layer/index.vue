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
    func: {
      type: Function,
      default: () => {
        alert('222')
      }
    },
    currentIndex: {
      type: Number,
      default: 0
    },
    guideList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    currentIndex(newVal) {
      if (newVal) {
        this.current = newVal
      }
    }
  },
  render() {
    let currentIndex = this.current
    let currentActiveGuideItemData = this.guideList[currentIndex]
    console.log('currentIndex', currentIndex, currentActiveGuideItemData)
    return (
      <div>
        {currentActiveGuideItemData && (
          <GuideItem
            key={currentIndex}
            targetDom={currentActiveGuideItemData.targetDom}
            confirmBtnText={currentActiveGuideItemData.text}
            vOn:confirm={currentActiveGuideItemData.clickHandle}
          />
        )}
      </div>
    )
  }
}
</script>
<style lang="scss" scoped>
.p {
  font-size: 30px;
}
</style>
