<template>
  <div class="wrapper">
    <div class="menuBlockLeftContentWrapper">
      <span>
        Контакты
      </span>
      <a href="mailto:info@bsc-studio.kz" class="first">
        info@bsc-studio.kz
      </a>
      <a class="second" href="tel:+7 (705) 553-99-66">
        +7 (705) 553-99-66
      </a>
      <div class="hrBlock">
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <span class="third">Написать нам!</span>
      <a href="https://instagram.com/bsc.studio?utm_medium=copy_link" class="four">instagram</a>
    </div>
    <div class="menuBlockRightContentWrapper">
      <ul>
        <li>
          <a href="#">Работы</a>
        </li>
        <li>
          <a href="#">Услуги</a>
        </li>
        <li>
          <a href="#">О студии</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'menuBlock'
}
</script>

<style lang="sass" scoped>
  .wrapper
    width: 100vw
    height: 100vh
    position: absolute
    top: 0
    left: 0
    background-color: rgba(0,0,0,.5)
    display: flex
    justify-content: space-between
    align-items: center
    padding: 10%
    color: white
    .menuBlockRightContentWrapper
      display: flex
      justify-content: center
      align-items: center
      ul
        padding: 0
        margin: 0
        list-style-type: none
        display: flex
        flex-direction: column
        justify-content: center
        align-items: flex-start
        a
          text-decoration: none
          color: white
          font-family: 'Abel', sans-serif
          font-size: 5em
          font-style: normal
          font-weight: 400
          line-height: 102px
          letter-spacing: 0em
          -webkit-text-fill-color: transparent
          -webkit-text-stroke: 1px white
          &:hover
            -webkit-text-fill-color: white
    .menuBlockLeftContentWrapper
      display: flex
      flex-direction: column
      justify-content: center
      font-family: Roboto
      font-size: 17px
      font-style: normal
      font-weight: 900
      line-height: 20px
      letter-spacing: 0em
      text-align: left
      & a
        text-decoration: none
        color: white
      & span
        cursor: pointer
      .hrBlock
        width: 100%
        position: relative
        margin-top: 7%
        .line
          width: 33%
          height: 1px
          background-color: #fff
          position: absolute
          &:nth-child(1)
            left: -35%
          &:nth-child(2)
            right: -10%
      .first, .second
        margin-top: 10%
      .third
        margin-top: 7%
      .four
        margin-top: 5%
</style>
