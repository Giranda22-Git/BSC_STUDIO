<template>
  <div class="wrapper">
    <div class="title">
      <headerr />
      <div class="text">
        <div class="Pr">Projects</div>
        <div class="Pr"></div>
      </div>
    </div>
  </div>
</template>

<script>
import headerr from '@/components/headder.vue'
export default {
  name: 'Home',
  components: {
    headerr
  }
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100%
    color: white
    .title
      background-color: black
      height: 50vh
      .text
        display: flex
        justify-content: space-around;
        .Pr
          width: 10%
          font-size: 5em
          margin-top: 10%
          text-transform: uppercase;
          font-family: Angry
</style>
