<template>
  <div class="wrapper">
    <div class="image_wrap">
      <div class="left">
        <img src="@/assets/mainPage/About.png" class="image_bsc">
      </div>
     <div class="right"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100vw
    background-color: black
    display: flex
    flex-direction: column
    .image_wrap
      height: 75%
      .left
      height: 83%
      background-color: black
      width: 100%
    .bot_block
      height: 25%
      width: 100%
      display: flex
      align-items: center
      flex-direction: column
      .line
        width: 80%
        height: 1px
        border: 1px solid white
      .text_wrap
        width: 80%
        height: 80%
        display: flex
        flex-direction: row
        align-items: center
        .left_text
          font-size: 1.9vh
          color: white
          width: 35%
        .right_text
          width: 65%
          font-size: 1.5vh
          color: white
  @media screen and ( max-width: 1024px )
    .image_bsc
      width: 100% !important
      height: 80% !important
    .text_wrap
      flex-direction: column !important
      .right_text
        margin-top: 1.5vh !important
        width: auto !important
        text-align: center !important
      .left_text
        margin-top: 1.5vh !important
        width: auto !important
</style>
