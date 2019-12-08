<template>
  <div class="page">
    <Navigator></Navigator>
      <div class="page-context">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import Navigator from './Navigator'

export default {
  name: 'Page',
  components: {
    Navigator
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.page{
  display: flex;
  flex-direction: column;
}
</style>
