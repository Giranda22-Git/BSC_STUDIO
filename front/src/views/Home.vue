<template>
  <div class="wrapper">
    <chatHelper id="chatHelper" />
    <About />
  </div>
</template>

<script>
import chatHelper from '@/components/chatHelper.vue'
import About from '@/components/About.vue'
export default {
  name: 'Home',
  components: {
    chatHelper,
    About
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    #chatHelper
      width: 30%
      height: 50vh
      display: none
</style>
