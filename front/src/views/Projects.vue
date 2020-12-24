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
      height: 100vh
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
            height: calc((100% / 3));
            margin-bottom: 5%
          .client
            width: 20%
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
</style>
