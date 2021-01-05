<template>
<div class="main">
  <headerr />
  <div class="text">Вне Воспринятие</div>
  <div class="show">
    <div class="el1"></div>
    <div class="el2">Showreal</div>
  </div>
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
    color: white
    width: 100%
    height: 100vh
    background-image: url('../assets/photo_main.jpg')
    background-size: cover
    background-repeat: no-repeat
    .text
      font-size: 5vw
      position: absolute
      left: 3%
      top: 60%
      color: white
      max-width: 40vw
      text-transform: uppercase;
      line-height: 80%
      font-family: Angry
    .show
      position: absolute
      left: 70%
      top: 55%
      width: 25.5%
      text-align: center
      .el1
        width: 100%
        height: 15vh
        background-image: url('../assets/anim.jpg')
        background-size: contain
        background-repeat: no-repeat
      .el2
        margin-left: 60%

</style>
