<script>
export default {
  functional: true,
  name: 'e-guid-item',
  render(h, context) {
    console.log('context', context)
    return (
      <div
        class="e-guide-item"
        {...context.data}
        onClick={context.data.clickHandle}
      >
        {context.data.text}
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
