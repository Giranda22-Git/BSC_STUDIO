<template>
  <div class="wrapper">
    <div class="company_wrap">
      <div class="line"></div>
      <div class="company_text_block">
        <div class="left">ABOUT US</div>
        <div class="right">We place great importance on the essential technology that influences human emotions and actions. Through extensive research and prototyping, we combine various technologies to create one single experience. Each day we work to maximize the value of experience by visualizing concepts and stories through technology and design. Where, with whom, and what will you experience, now that the line between reality and the virtual has been removed? We use creative power to present the answers and design the future of experience.</div>
      </div>
    </div>
    <div class="company_wrap">
      <div class="line"></div>
      <div class="company_text_block">
        <div class="left">КОМПАНИЯ</div>
        <div class="right">Наша компания занимается разработкой веб-страниц, мобильных приложений и telegram ботов. Обращайтесь к нам, мы воплотим все ваши пожелания в реальность!</div>
      </div>
    </div>
    <div class="company_wrap">
      <div class="line"></div>
      <div class="company_text_block">
        <div class="left">ПОЧЕМУ BSC Studio</div>
        <div class="right">BSC Studio — современная, перспективная компания по разроботке веб-страниц, мобильных приложений и telegram ботов. У нас работают программисты со стажами работы от 6 лет. Благодаря опытным программистам, мы можем позволить себе придоставление услуг по привлекательной цене.</div>
      </div>
    </div>
    <div class="company_wrap">
      <div class="line"></div>
      <div class="company_text_block">
        <div class="left">ЦЕНЫ</div>
        <div class="right">Цены начинаются от 40.000тг. <br>У нашей комании такие дешевые ценны, так как мы стараемся делать работу быстро, дешево и качественно.</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About2'
}
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap')
  .wrapper
    min-height: 100vh
    width: 100vw
    background-color: black
    display: flex
    align-items: center
    flex-direction: column
    justify-content: space-around
    .company_wrap
      width: 80%
      height: 28%
      .line
        width: 100%
        border: 1px solid #FFFFFF
      .company_text_block
        margin-top: 5vh
        height: 50%
        width: 100%
        display: flex
        flex-direction: row
        .left
          font-family: 'Abel', sans-serif
          font-size: 2vh
          color: white
          width: 30%
          height: 100%
        .right
          font-family: 'Abel', sans-serif
          font-size: 1.8vh
          color: white
          width: 70%
          height: 100%
          border-left: 1px solid #b0adac
          padding-left: 2vw
  @media screen and ( max-width: 1024px )
    .company_wrap
      height: 33% !important
      .company_text_block
        flex-direction: column !important
        .right
          width: 100% !important
</style>
