<template>
    <div id="navbar-container">
        <header>
            <h1 id="logo">Mail Note Manager</h1>
            <h4 id="welcome" v-if='showWelcome'>welcome {{username}}</h4>
        </header>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
   name: "Navbar",

   computed: {
      ...mapState([
        'loginSuccessful',
        'username'
      ]),
      showWelcome: function() {
          return this.loginSuccessful;
      }
    }
}
</script>

<style scoped lang="scss">
#navbar-container {
  max-height: 43px;
}
header {
    max-height: 43px;
    display: flex;
    justify-content: space-between;;
    background-color: #96cebc;
    margin-top: 0px;
    padding-top: 0px;
    border-bottom: 1px solid #adb5bd;
    box-shadow: 0px 1px #d6d6d6;
  }

  #logo {
    padding-left: 1%;
    margin: 4px;
    color: #272727;
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-style: normal;
    font-size: 1.43rem;
    font-weight: 700;
    letter-spacing: 0.3px;
  }

  #welcome {
    padding-right: 1%;
    margin: 4px;
    color: #272727;
    font-family: Roboto,Helvetica,Arial,sans-serif;
    font-style: normal;
    font-size: 1.26rem;
    font-weight: 500;
    letter-spacing: 0.3px;
  }
</style>