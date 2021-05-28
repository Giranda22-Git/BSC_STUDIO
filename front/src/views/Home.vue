<template>
  <div class="wrapper">
    <chatHelper />
    <theHeader />
    <About />
    <About2 />
  </div>
</template>

<script>
import theHeader from '@/components/theHeader.vue'
import About from '@/components/About.vue'
import About2 from '@/components/About2.vue'
import chatHelper from '@/components/chatHelper.vue'
export default {
  name: 'Home',
  components: {
    theHeader,
    About,
    About2,
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
      display: none
</style>
