<script>
export default {
  functional: true,
  name: 'e-guid-item',
  render(h, context) {
    console.log('context', context)
    return (
      <div class="e-guide-item" {...context.data}>
        {context.data.render && context.data.render()}
        <div onClick={context.data.clickHandle} class="confirm-btn">
          {context.data.text}
        </div>
      </div>
    )
  }
}
</script>

<style lang="scss" scoped>
.e-guide-item {
  font-size: 30px;
}
</style>
