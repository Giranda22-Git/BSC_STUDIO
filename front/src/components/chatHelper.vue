<template>
  <div class="wrapper">
    <div class="helper-agent">
      <div class="avatar"></div>
      <div class="naming">Administrator</div>
    </div>
    <div class="regForm" v-show="isAuth">
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="phone" type="phone" placeholder="Phone" @keypress.enter="reg">
      <button @click="reg">send</button>
    </div>
    <div class="chat-list" v-show="!isAuth">
      <div class="message"
        v-for="(message, index) in user.messages"
        :key="message + index"
      >
        {{ message }}
      </div>
    </div>
    <div class="message-input">
      <input v-model="message" type="text" name="message" id="message" @keypress.enter="send">
      <button @click="send">></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'chatHelper',
  data: () => ({
    message: null,
    phone: null,
    username: null,
    user: {
      messages: []
    },
    isAuth: true
  }),
  mounted () {
    const connection = new WebSocket('ws://localhost:1000')
    console.log(connection)
    connection.onmessage = (msg) => {
      console.log(msg)
    }
  },
  methods: {
    async reg () {
      const params = {
        userName: this.username,
        phoneNumber: this.phone
      }
      await axios.post('http://localhost:3000/messages', params)
        .then(response => {
          if (response.status === 200) {
            this.user = response.data
            this.isAuth = false
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    async send () {
    }
  }
}
</script>

<style lang="sass" scoped>
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
        width: 5vh
        height: 5vh
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
      height: 5%
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
