<template>
  <div class="wrapper">
    <div class="title">
      <headerr />
      <div class="text">
        <div class="Pr">Projects</div>
        <div class="Pr"></div>
      </div>
    </div>
    <div class="photo"></div>
    <div class="about">
      <div class="line"></div>
      <div class="obzor">
        <div class="obzor-title">Обзор</div>
        <div class="title-text">
          <div class="info">Задача организации, в особенности же начало повседневной работы по формированию позиции требуют от нас анализа существенных финансовых и административных условий. Повседневная практика показывает, что консультация с широким активом требуют определения и уточнения существенных финансовых и административных условий. Идейные соображения высшего порядка, а также консультация с широким активом влечет за собой процесс внедрения и модернизации системы обучения кадров, соответствует насущным потребностям. Равным образом постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании соответствующий условий активизации.</div>
          <div class="info">Не следует, однако забывать, что дальнейшее развитие различных форм деятельности обеспечивает широкому кругу (специалистов) участие в формировании дальнейших направлений развития. Таким образом консультация с широким активом представляет собой интересный эксперимент проверки форм развития. Повседневная практика показывает, что постоянный количественный рост и сфера нашей активности обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития.</div>
          <div class="info">Не следует, однако забывать, что новая модель организационной деятельности в значительной степени обуславливает создание направлений прогрессивного развития. Товарищи! рамки и место обучения кадров способствует подготовки и реализации системы обучения кадров, соответствует насущным потребностям. Равным образом начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки модели развития.</div>
          <div class="client">
            <div class="client-info">
              <div class="name">ГОД</div>
              <div class="value">2020</div>
            </div>
            <div class="client-info">
              <div class="name">КЛИЕНТ</div>
              <div class="value">ТЕРМОС</div>
            </div>
            <div class="client-info">
              <div class="name">КАТЕГОРИЯ</div>
              <div class="value">Сайт</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="projects">
      <div class="project left"></div>
      <div class="project right"></div>
    </div>
    <div class="other_works">
      <div class="inner-photo"></div>
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
        justify-content: space-around
        .Pr
          color: transparent
          -webkit-text-stroke: 1px white
          width: 10%
          font-size: 5em
          margin-top: 10%
          text-transform: uppercase
          font-family: Angry
    .photo
      height: 100vh
      background-image: url('../assets/proj_photo.jpg')
      background-size: cover
      background-repeat: no-repeat
    .about
      height: 80vh
      background-color: white
      .line
        border: 1px solid #000000
        border-radius: 1px
        width: 90%
        margin: 7% 5% 4% 5%
      .obzor
        font-family: Angry
        color: black
        display: flex
        flex-direction: row
        height: 70vh
        .obzor-title
          font-size: 2em
          width: 25%
          margin-left: 5%
        .title-text
          width: 75%
          display: flex
          flex-direction: column
          .info
            max-width: 80%
            font-size: 130%
            max-height: calc((100% / 5));
            margin-bottom: 5%
            overflow: hidden
          .client
            width: 40%
            display: flex
            flex-direction: column
            .client-info
              display: flex
              flex-direction: row
              .name
                font-weight: bold
                float: left
                width: 50%
              .value
                width: 50%
    .projects
      background-color: black
      display: flex
      flex-direction: column
      align-items: center
      .left
        background-image: url('../assets/project1.png')
        margin: 10vh 0 11vh 20vw
        height: 55vh
        width: 55vw
        background-size: cover
      .right
        background-image: url('../assets/project2.png')
        margin: 10vh 20vw 11vh 0
        height: 55vh
        width: 55vw
        background-size: cover
    .other_works
      background-image: url('../assets/other_works.png')
      background-size: contain
      height: 52.3vw
      background-repeat: no-repeat
      display: flex
      justify-content: center
      .inner-photo
        width: 42%
        height: 37%
        margin: 18.3% 0.5% 11% 0
        background-image: url('../assets/project2.png')
        background-size: contain
        background-repeat: no-repeat

</style>
