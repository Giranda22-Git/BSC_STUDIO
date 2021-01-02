<template>
<div class="main">
  <headerr />
  <div class="text">Вне Воспрнятие</div>
  </div>
</template>

<script>
import headerr from '../components/headder'
export default {
  name: 'Main',
  components: {
    headerr
  },
  data: function () {
    return {
    }
  },
  beforeMount () {
  },
  mounted () {
  }
}
</script>

<style lang="sass" scoped>
  .main
    width: 100%
    height: 100vh
    background-image: url('../assets/photo_main.jpg')
    background-size: cover
    background-repeat: no-repeat
    .text
      font-size: 6em
      position: absolute
      left: 2%
      top: 60%
      color: white
      max-width: 40vw
      text-transform: uppercase;
      line-height: 80%
      font-family: Angry

</style>
