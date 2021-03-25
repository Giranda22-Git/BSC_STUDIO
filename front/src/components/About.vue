<template>
  <div class="wrapper">
    <div class="image_wrap">
      <div class="left">
      <img src="@/assets/mainPage/About.png" class="image_bsc">
     </div>
     <div class="right"></div>
    </div>
    <div class="bot_block">
      <div class="line"></div>
      <div class="text_wrap">
        <div class="left_text">ABOUT US</div>
        <div class="right_text">We place great importance on the essential technology that influences human emotions and actions. Through extensive research and prototyping, we combine various technologies to create one single experience. Each day we work to maximize the value of experience by visualizing concepts and stories through technology and design. Where, with whom, and what will you experience, now that the line between reality and the virtual has been removed? We use creative power to present the answers and design the future of experience.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap')
  .wrapper
    width: 100vw
    height: 100vh
    background-color: black
    display: flex
    flex-direction: column
    .image_wrap
      height: 75%
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
          font-family: 'Abel', sans-serif
          font-size: 1.9vh
          color: white
          width: 35%
        .right_text
          width: 65%
          font-family: 'Abel', sans-serif
          font-size: 1.5vh
          color: white
  @media screen and ( max-width: 1024px )
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
