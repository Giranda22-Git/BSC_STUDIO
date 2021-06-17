<template>
  <div id="app">
    <router-view @switchMenuBlock='switchMenuBlock' />
    <chatHelper />
  </div>
</template>

<script>
import chatHelper from '@/components/chatHelper'
export default {
  name: 'App',
  components: {
    chatHelper
  },
  methods: {
    switchMenuBlock (arg) {
      if (arg) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }
}
</script>

<style lang="sass">
  *
    box-sizing: border-box
    font-family: sans-serif
  #app
    position: relative
  html
    font-size: 14px
  body
    margin: 0
    padding: 0
</style>
