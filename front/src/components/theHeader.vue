<template>
  <div class="wrapper">
    <div class="front">
      <div class="topContentWrapper">
        <div class="leftContentWrapper">
          <router-link to="/">BSC STUDIO</router-link>
        </div>
        <div class="rightContentWrapper">
          <ul>
            <li>
              Работы
            </li>
            <li>
              Услуги
            </li>
            <li>
              О Нас
            </li>
            <li class="burgerBTN" ref="burgerBTN" @click="burgerAnim">
              <div ref="firstLine" class="firstLine"></div>
              <div ref="secondLine" class="secondLine"></div>
            </li>
          </ul>
        </div>
      </div>
      <div class="middleContentWrapper">
        ВНЕ ВОСПРИЯТИЕ
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theHeader',
  data: () => ({
    burgerMenuStatus: false
  }),
  methods: {
    burgerAnim () {
      if (this.burgerMenuStatus) {
        this.$refs.firstLine.style.transform = 'rotate(0deg) translate(0,4px)'
        this.$refs.secondLine.style.transform = 'rotate(0deg) translate(0,-4px)'
        this.$emit('switchMenuBlock', false)
        this.burgerMenuStatus = false
      } else {
        this.$refs.firstLine.style.transform = 'rotate(45deg) translate(0px, 0px)'
        this.$refs.secondLine.style.transform = 'rotate(-45deg) translate(0px, -0px)'
        this.$emit('switchMenuBlock', true)
        this.burgerMenuStatus = true
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  @import url('https://fonts.googleapis.com/css2?family=Abel&display=swap')
  .wrapper
    width: 100vw
    height: 100vh
    background: url(../assets/mainPage/headerBackground.svg) center no-repeat
    background-size: cover
    display: flex
    flex-direction: column
    justify-content: flex-start
    align-items: center
    .front
      width: 90%
      height: 100%
      .middleContentWrapper
        width: 100%
        text-align: center
        font-family: 'Abel', sans-serif
        color: white
        font-size: 86px
        margin-top: 20vh
        text-shadow: 1px 1px 2px black, 0 0 1em black
      .topContentWrapper
        width: 100%
        height: 10%
        display: flex
        justify-content: space-between
        align-items: center
        .leftContentWrapper
          display: flex
          align-items: center
          position: relative
          a
            text-align: left
            color: white
            font-family: 'Abel', sans-serif
            font-weight: 10
            font-size: 24px
            cursor: pointer
            text-decoration: none
        .rightContentWrapper
          width: 50%
          color: white
          font-family: Roboto, sans-serif
          font-weight: light
          font-size: 17.2px
          ul
            padding: 0
            margin: 0
            list-style-type: none
            width: 100%
            display: flex
            justify-content: flex-end
            li
              margin-left: 7%
              display: flex
              justify-content: center
              align-items: center
              cursor: pointer
            .burgerBTN
              position: relative
              width: 80px
              height: 80px
              display: flex
              justify-content: space-evenly
              align-items: center
              .firstLine, .secondLine
                position: absolute
                width: 45px
                height: 1px
                background-color: #fff
                transition: all .4s ease-in-out
                border-radius: 1px
              .firstLine
                transform: translateY(4px)
              .secondLine
                transform: translateY(-4px)

</style>
