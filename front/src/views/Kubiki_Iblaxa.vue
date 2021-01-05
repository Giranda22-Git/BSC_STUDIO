<template>
<div class="main">
  <headerr />
  <div class="inner-photo"></div>
  <div class="text">
    <div class="el top">КУБИКИ</div>
    <div class="el" v-for="item in 4" :key="item">Кубики Ибляха</div>
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
    background-image: url('../assets/other_works.png')
    background-size: contain
    background-repeat: no-repeat
    height: 52.9vw
    .text
      display: flex
      flex-direction: column
      justify-content: space-around
      align-items: center
      .el
        color: transparent
        letter-spacing: 0.05em
        -webkit-text-stroke: 0.4px white
        width: 60%
        font-size: 3vw
        margin-top: 2%
        text-transform: uppercase
        font-family: Angry
      .top
        margin-top: 12%
        color: white
        -webkit-text-stroke: 0.8px white

</style>
