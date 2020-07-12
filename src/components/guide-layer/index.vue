<script>
import GuideItem from './GuidItem'
export default {
  name: 'e-guide-layer',
  data() {
    return {}
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
      default: () => [
        {
          text: '下一步1',
          clickHandle: () => {
            alert('下一步1')
          }
        },
        {
          text: '下一步2'
        },
        {
          text: '你知道'
        }
      ]
    }
  },
  render() {
    let currentIndex = this.currentIndex
    let currentActiveGuideItemData = this.guideList[currentIndex]
    console.log(currentIndex)
    return (
      <div>
        {currentActiveGuideItemData && (
          <GuideItem {...currentActiveGuideItemData} />
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
