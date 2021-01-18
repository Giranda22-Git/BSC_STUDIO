<template>
  <div class="wrapper">
    <div class="helper-agent">
      <div class="avatar"></div>
      <div class="naming">Administrator</div>
    </div>
    <div class="regForm" v-show="isAuth">
      <input v-model="userName" type="text" placeholder="Username">
      <input v-model="phone" type="phone" placeholder="Phone" @keypress.enter="reg">
      <button @click="reg">send</button>
    </div>
    <div class="chat-list" v-show="!isAuth">
      <div class="message"
        v-for="(message, index) in user.messages"
        :key="message + index"
      >
        <div class="senderAvatar"></div>
        <div class="bandleFix">
          <div class="messageBandle">
            <div class="username">
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
      <input v-model="inputMessage" type="text" name="message" id="message" @keypress.enter="send">
      <button @click="send">></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
const connection = new WebSocket('ws://192.168.110.26:1000/')
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
        await axios.post('http://192.168.110.26:3000/messages/messageFromAdmin', params)
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
      await axios.post('http://192.168.110.26:3000/messages', params)
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
    .helper-agent
      width: 90%
      height: 10%
      display: flex
      justify-content: space-evenly
      align-items: center
      .avatar
        width: 8%
        padding-bottom: 8%
        border-radius: 50%
        background: url(../assets/avatar.jpeg) center no-repeat
        background-size: cover
      .naming
        width: 80%
        font-size: 2rem
        opacity: .7
    .chat-list
      width: 90%
      height: 80%
      transition: 1s
      overflow-y: auto
      .message
        width: 100%
        min-height: 20%
        height: auto
        display: flex
        justify-content: space-between
        align-items: center
        .senderAvatar
          width: 12%
          padding-bottom: 12%
          border-radius: 50%
          background: linear-gradient(180deg, #0062D5 0%, #A76868 100%)
        .bandleFix
          width: 85%
          height: auto
          .messageBandle
            width: 100%
            display: flex
            justify-content: space-between
            align-items: center
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
            font-family: Roboto
            font-weight: 900
            font-size: 1.3rem
    .regForm
      width: 90%
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
      button
        font-size: 1.5rem
        background-color: transparent
        border: none
        cursor: pointer
    .message-input
      width: 90%
      height: 10%
      display: flex
      justify-content: center
      align-items: center
      input
        width: 85%
        height: 100%
        font-size: 1.5rem
      button
        width: 15%
        height: 100%
        font-size: 1.5rem
        background-color: transparent
        border: none
        cursor: pointer
</style>
