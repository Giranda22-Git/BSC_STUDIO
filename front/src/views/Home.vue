<template>
  <div class="wrapper">
    <theHeader />
    <About />
  </div>
</template>

<script>
import theHeader from '@/components/theHeader.vue'
import About from '@/components/About.vue'
export default {
  name: 'Home',
  components: {
    theHeader,
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
