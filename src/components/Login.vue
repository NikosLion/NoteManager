<template>
  <div class="login" v-if='showLogin'>
    <div v-if="loggingIn" class="container-loading">
      <img src="./img/loading.gif" alt="Loading Icon">
    </div>
    <p v-if="loginError">{{ loginError }}</p>
    <form @submit.prevent="loginSubmit">
      <input type="email" placeholder="E-Mail" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: ''
      }
    },
    computed: {
      ...mapState([
        'loggingIn',
        'loginError',
        'loginSuccessful'
      ]),
      showLogin: function() {
          return !this.loginSuccessful;
      }
    },
    methods: {
      ...mapActions([
        'doLogin'
      ]),
      loginSubmit() {
        this.doLogin({
          email: this.email,
          password: this.password
        })
      }
    }
  }
</script>


<style scoped lang="scss">
  .login {
    border: 1px solid rgb(0, 105, 56);
    border-radius: 4px;
    padding: 1.5rem;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    margin-top:2rem;
    position: relative;
    overflow: hidden;
    .container-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(250, 250, 250, 0.788);
      img {
        width: 2rem;
        height: 2rem;
      }
    }
    p{
        font-family: Roboto,Helvetica,Arial,sans-serif;
        font-style: normal;
        font-size: 1.1rem;
    }
    form {
      display: flex;
      flex-flow: column;
      *:not(:last-child) {
        margin-bottom: 1rem;
      }
      input {
        padding: .5rem;
      }
      button {
        padding: .5rem;
        background-color: #96cebc;;
        border: 1px solid gray;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background-color: rgb(96, 194, 161);
          transition: background-color 0.5s ease;
        }
      }
    }
  }
</style>