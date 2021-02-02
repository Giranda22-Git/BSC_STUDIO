<template>
  <div class="wrapper">
    <!-- <div class="helper-agent">
      <div class="avatar"></div>
      <div class="naming">BSC STUDIO</div>
    </div> -->
    <div class="regForm" v-show="isAuth">
      <input v-model="userName" type="text" placeholder="Username">
      <input v-model="phone" type="phone" placeholder="Phone" @keypress.enter="reg">
      <button @click="reg">send</button>
    </div>
    <div class="chat-list" v-show="!isAuth" v-chat-scroll="{smooth: true, notSmoothOnInit: true}">
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
    <div class="message-input">
      <hr>
      <div class="form">
        <input v-model="inputMessage" type="text" name="message" id="message" @keypress.enter="send" placeholder="      Сообщение...">
        <button @click="send">
          <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.0041 19L11 9.99995L0.999998 1" stroke="black"/>
</svg>

        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const connection = new WebSocket('ws://192.168.1.154:1000/')
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
    }
  }),
  mounted () {
    connection.onmessage = async (msg) => {
      const data = JSON.parse(msg.data)
      console.log(data)
      data.data.timestamp = new Date(data.data.timestamp)
      if (data.action === 'saveFromAdminMessage') {
        const params = {
          data: data,
          phoneNumber: this.phone
        }
        await axios.post('http://192.168.1.154:3000/messages/messageFromAdmin', params)
          .then(response => {
            if (response.status === 200) {
              console.log(response.data)
              this.data = response.data
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
      this.trustedMessage = data
      this.user.messages.push(data)
    }
    connection.onerror = (err) => {
      console.log(err)
    }
  },
  methods: {
    async reg () {
      const params = {
        userName: this.userName,
        phoneNumber: this.phone
      }
      await axios.post('http://192.168.1.154:3000/messages', params)
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
    box-shadow: 0 0 20px 1px rgba(0, 0, 0, .3)
    border-top-left-radius: 20px
    border-top-right-radius: 20px
    position: fixed
    bottom: 5%
    right: 5%
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    .chat-list
      width: 95%
      height: 80%
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
      height: 80%
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      transition: 1s
      input, button
        width: 90%
        height: 7%
        margin-bottom: 10%
        -webkit-box-shadow: inset 0 0 0 50px #fff
        -webkit-text-fill-color: #000
      button
        font-size: 1.5rem
        background-color: transparent
        border: none
        cursor: pointer
    .message-input
      width: 95%
      height: 20%
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
        height: 80%
        input
          width: 93%
          height: 100%
          font-size: 1.5rem
          border: none
          outline: none
          -webkit-box-shadow: inset 0 0 0 50px #fff
          -webkit-text-fill-color: #000
          &::focus
            background: none
        button
          width: 7%
          height: 100%
          font-size: 1.5rem
          background-color: transparent
          border: none
          cursor: pointer
          padding: 0
</style>
