<template>
  <div class="wrapper">
    <chatHelper id="chatHelper" />
  </div>
</template>

<script>
import chatHelper from '@/components/chatHelper.vue'
export default {
  name: 'Home',
  components: {
    chatHelper
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    #chatHelper
      width: 30%
      height: 50vh
</style>
