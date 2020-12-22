<template>
<div class="header">
  <div class = "logo-space">
    <img class = "logo" src="../assets/logo.svg">
  </div>
  <div class = "space"></div>
  <div class="text">
    <div class="info">Работы</div>
    <div class="info">Услуги</div>
    <div class="info">О студии</div>
    <div class="rect">
      <img class = "recta" src="../assets/rectangle.jpg">
      <img class = "recta" src="../assets/rectangle.jpg">
    </div>
  </div>

</div>
</template>

<script>
export default {
  name: 'header',
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
  .header
    font-family: SF Pro Display;
    font-style: normal;
    margin: 0
    padding: 0
    width: 100vw
    height: 10vh
    display: flex
    flex-direction: row
    align-items: center
    .logo-space
      width: 20%
      text-align: center
      .logo
        width: 80%
    .space
      width: 30%
    .text
      width: 50%
      justify-content: center;
      display: flex
      flex-direction: row
      .info
        width: 20%
        font-weight: 400;
        font-size: 1em;
        color: #FFFFFF;
        text-align: center
      .rect
        display: flex
        justify-content: center;
        align-items: flex-end
        width: 30%
        flex-direction: column
        .recta
          width: 10%
          height: 20%
          padding: 0.1em

</style>
