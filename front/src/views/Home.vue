<template>
  <div class="wrapper">
    <theHeader />
    <About />
    <About2 />
  </div>
</template>

<script>
import theHeader from '@/components/theHeader.vue'
import About from '@/components/About.vue'
import About2 from '@/components/About2.vue'
export default {
  name: 'Home',
  components: {
    theHeader,
    About,
    About2
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
