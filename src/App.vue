<template>
  <div id="app">
    <Navbar />
    <Login />
    <div id="main">
      <Actions />
      <Notes />
    </div>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import Actions from './components/Actions.vue'
import Notes from './components/Notes.vue'

export default {
  name: 'app',
  components: {
    Navbar,
    Login,
    Actions,
    Notes
  }
}
</script>

<style>
 * {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
 }

 body {
  font-family: "Open Sans", Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
 }

 #app {
  display: flex;
  flex-direction: column;
 }

 #main{
   display: flex;
   align-content: space-between;
   height: calc(100vh - 100px)
 }
</style>
