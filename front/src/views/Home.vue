<template>
  <div class="wrapper">
    <transition name="fade">
      <menuBlock style="transition: 1s" v-if="opened" />
    </transition>
    <theHeader @switchMenuBlock='switchMenuBlock' />
    <About />
    <About2 />
  </div>
</template>

<script>
import theHeader from '@/components/theHeader.vue'
import About from '@/components/About.vue'
import About2 from '@/components/About2.vue'
import menuBlock from '@/components/menuBlock'
export default {
  name: 'Home',
  data: () => ({
    opened: false
  }),
  components: {
    theHeader,
    About,
    About2,
    menuBlock
  },
  methods: {
    switchMenuBlock (arg) {
      this.opened = arg
      this.$emit('switchMenuBlock', arg)
    }
  }
}
</script>

<style lang="sass" scoped>
  .fade-enter-active,
  .fade-leave-active
    transition: opacity .2s ease
  .fade-enter,
  .fade-leave-to
    opacity: 0
  .wrapper
    width: 100%
    #chatHelper
      width: 30%
      height: 50vh
      display: none
</style>
