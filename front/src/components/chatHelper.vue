<template>
  <div class="wrapper" ref="wrapper">
    <div v-if="!opened" class="openAnimation" @click="openAnimation" ref="openAnimation"></div>
    <div v-if="!opened" class="chatHelperText">Чат</div>
    <svg @click="closeAnimation" v-show="opened" ref="close" class="close bi bi-x"  xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
    <div class="regForm" v-show="isAuth" v-if="opened">
      <input class="regFormUserName" v-model="userName" type="text" placeholder="Username">
      <input class="regFormPhone" v-model="phone" type="phone" placeholder="Phone" @keypress.enter="reg">
      <button class="regFormSend" @click="reg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
        </svg>
      </button>
    </div>
    <div v-if="opened" v-show="!isAuth" class="chatingBlock">
      <div class="chat-list" v-chat-scroll="{smooth: true, notSmoothOnInit: true}">
        <div class="message"
          v-for="(message, index) in user.messages"
          :key="message + index"
        >
          <div v-bind:class="{ 'senderAvatarAdmin': message.data.userName === 'BSC STUDIO', 'senderAvatar': message.data.userName !== 'BSC STUDIO' }">
            <span>
              {{ message.data.userName.charAt(0) }}
            </span>
          </div>
          <div class="bandleFix">
            <div class="messageBandle">
              <div class="username" v-bind:class="{ 'senderMessageAdmin': message.data.userName === 'BSC STUDIO', 'senderMessage': message.data.userName !== 'BSC STUDIO' }">
                {{ message.data.userName }}
              </div>
              <div class="timestamp">
                {{ message.data.timestamp.toLocaleString("ru") }}
              </div>
            </div>
            <div class="messageBody">
              {{ message.data.message }}
            </div>
          </div>
        </div>
      </div>
      <div v-if="opened" v-show="!isAuth" class="message-input">
        <hr>
        <div class="form">
          <input v-model="inputMessage" type="text" name="message" id="message" @keypress.enter="send" placeholder="Сообщение...">
          <svg @click="send" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right-circle" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let connection = null
//  { "result": true, "phoneNumber": "+7(705)-553-99-66", "userName": "Administrator", "message": "hello" }
//  { "action": "sendMessage", "agent": "telegram", "data": { "result": true, "phoneNumber": "+7(705)-553-99-66", "userName": "Administrator", "message": "hello" } }
export default {
  name: 'chatHelper',
  data: () => ({
    inputMessage: null,
    phone: null,
    userName: null,
    user: {
      messages: []
    },
    isAuth: true,
    trustedMessage: {
      data: {
        message: 'Administrator'
      }
    },
    opened: false,
    openedAnimation: false
  }),
  methods: {
    openAnimation () {
      this.$refs.wrapper.style.width = '30%'
      this.$refs.wrapper.style.height = '60%'
      this.$refs.wrapper.style.borderRadius = '20px'
      this.$refs.wrapper.style.animationDuration = '0s'
      this.$refs.wrapper.style.cursor = 'auto'
      this.$refs.wrapper.style.alignItems = 'flex-end'
      this.opened = true
    },
    closeAnimation () {
      this.$refs.wrapper.style.width = '80px'
      this.$refs.wrapper.style.height = '80px'
      this.$refs.wrapper.style.borderRadius = '50%'
      this.$refs.wrapper.style.animationDuration = '2s'
      this.$refs.wrapper.style.alignItems = 'center'
      this.$refs.wrapper.style.cursor = 'pointer'
      this.opened = false
    },
    async connect () {
      connection = new WebSocket('ws://localhost:1000/' + this.phone)

      connection.onmessage = async (msg) => {
        const data = JSON.parse(msg.data)
        console.log(data)
        data.data.timestamp = new Date(data.data.timestamp)
        this.trustedMessage = data
        this.user.messages.push(data)
      }

      connection.onclose = async e => {
        setTimeout(() => this.connect(), 1)
      }

      connection.onerror = (err) => {
        console.log(err)
      }
    },
    async reg () {
      const params = {
        userName: this.userName,
        phoneNumber: this.phone
      }

      this.connect()

      await axios.post('http://localhost:3000/messages', params)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data)
            response.data.messages.forEach(element => {
              element.data.timestamp = new Date(element.data.timestamp)
            })
            this.user = response.data
            this.isAuth = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async send () {
      const params = JSON.stringify({
        action: 'message',
        agent: 'client',
        data: {
          userName: this.userName,
          phoneNumber: this.phone,
          message: this.inputMessage
        }
      })
      this.inputMessage = ''
      connection.send(params)
    }
  }
}
</script>

<style lang="sass" scoped>
  @font-face
    src: url(../assets/angryFont/Angry.otf)
    font-family: Angry
  .wrapper
    width: 80px
    height: 80px
    background: linear-gradient(88.33deg, rgba(155, 155, 155, 0.4) -41.77%, rgba(196, 196, 196, 0) 188.54%)
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))
    backdrop-filter: blur(5px)
    position: fixed
    right: 2%
    bottom: 2%
    color: white
    font-size: 2em
    border-radius: 50%
    animation: pulse 2s infinite
    display: flex
    justify-content: center
    align-items: center
    cursor: pointer
    transition: 1s
    z-index: 100
    .openAnimation
      width: 100%
      height: 100%
      position: absolute
      border-radius: 50%
    .close
      position: absolute
      right: 3%
      top: 2%
      width: 1.5em
      height: 1.5em
      cursor: pointer
    .chatingBlock
      width: 100%
      height: 92.99%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      .chat-list
        width: 95%
        height: 89%
        transition: 1s
        overflow-y: auto
        &::-webkit-scrollbar-track
          border-radius: 4px
        &::-webkit-scrollbar
          width: 3px
        &::-webkit-scrollbar-thumb
          border-radius: 4px
          background: #0062D4
        &:hover::-webkit-scrollbar-thumb
          background: rgba(#0062D4, .8)
        .message
          width: 100%
          min-height: 20%
          height: auto
          display: flex
          justify-content: space-between
          align-items: center
          padding-left: 2%
          padding-top: 2%
          padding-right: 1%
          .senderAvatarAdmin
            width: 12%
            padding-bottom: 12%
            border-radius: 50%
            background: linear-gradient(180deg, #47C8FF 0%, #3A52FE 100%)
            position: relative
            box-shadow: 0px -2px 15px 1px #3A52FE
          .senderAvatar
            width: 12%
            padding-bottom: 12%
            border-radius: 50%
            background: linear-gradient(-55deg, #0062D5 0%, #A76868 90%)
            position: relative
          span
            position: absolute
            left: 50%
            top: 50%
            transform: translate(-50%, -45%)
            font-size: 2rem
            color: white
            font-family: Angry
            font-weight: 400
          .bandleFix
            width: 85%
            height: auto
            .messageBandle
              width: 100%
              display: flex
              justify-content: space-between
              align-items: center
              .senderMessage
                color: #816781
              .senderMessageAdmin
                color: #4296FF
              .username
                width: 100%
                font-family: Angry
                font-weight: 400
                font-size: 1.5rem
              .timestamp
                font-size: 1.2rem
                white-space: nowrap
                font-weight: 700
            .messageBody
              width: 100%
              height: auto
              padding-top: 2%
              font-family: sans-serif
              font-weight: 600
              font-size: 1.3rem
    .regForm
      width: 95%
      height: 95%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      transition: 1s
      .regFormUserName, .regFormPhone
        width: 80%
        height: 1.5em
        outline: none
        border: none
        background-color: transparent
        border-bottom: 1px solid white
        font-size: .8em
        color: white
        text-shadow: 0 0 1px black
        letter-spacing: .1em
        padding: .1em
        margin-bottom: 1.2em
      input::placeholder
        font-size: .9em
        text-shadow: none
        color: white
      .regFormSend
        width: 50px
        height: 40px
        color: white
        background-color: transparent
        border: none
        cursor: pointer
    .message-input
      width: 95%
      height: 11%
      display: flex
      flex-direction: column
      justify-content: space-between
      align-items: center
      hr
        width: 100%
        height: 3px
        margin: 0
      .form
        width: 100%
        height: 100%
        display: flex
        justify-content: center
        align-items: center
        input
          width: 93%
          height: 100%
          font-size: 1.5rem
          border: none
          outline: none
          background-color: transparent
          color: white
          padding: 0
          &::placeholder
            color: white
        svg
          width: 5%
          font-size: 1.5rem
          background-color: transparent
          border: none
          cursor: pointer
          padding: 0
          color: white
  @keyframes pulse
    0%
      box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5)
    100%
      box-shadow: 0 0 0 30px rgba(255, 255, 255, 0)
</style>
