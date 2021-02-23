<template>
  <div class="wrapper">
    <Header />
    <chatHelper id="chatHelper" />
  </div>
</template>

<script>
import chatHelper from '@/components/chatHelper.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'Home',
  components: {
    chatHelper,
    Header
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
