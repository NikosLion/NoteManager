/* eslint-disable no-console */
<template>
  <div id="app">
    <Navbar />
    <Login />
    <div id="main">
      <Actions />
      <Notes />
      <input ref="fileInput"
       type="file"
       name="file-upload"
       multiple=""
       accept="image/jpeg, image/png"
       @change="onUploadFiles">
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from './components/HelloWorld.vue';
import Navbar from './components/Navbar.vue'
import Login from './components/Login.vue'
import Actions from './components/Actions.vue'
import Notes from './components/Notes.vue'

@Component({
  components: {
    HelloWorld,
    Navbar,
    Login,
    Actions,
    Notes
  },
})
export default class App extends Vue {
  $refs: {
    fileInput: HTMLInputElement
  }

  private onUploadFiles(event: Event): void {
    // this.$refs.fileInput = {};
    const files: Array<File> = [...(this.$refs.fileInput.files ? this.$refs.fileInput.files : [])];
        files.forEach((file) => {
          // eslint-disable-next-line no-console
          console.log(this.$refs.fileInput);
        if(this.$refs.fileInput.files[0] !== null){
          // eslint-disable-next-line no-console
          //console.log('e.target:' + event.target.value);
          // eslint-disable-next-line no-console
          console.log(this.$refs.fileInput.files[0]);
        }
        });
  }
  // private onFileChanged(event: InputEvent) {
  //   let files: FileList = event.target.files;
  //   let result: File[] = [];
  //   for(var i=0; i < files.length; i++) {
  //     result.push(<File>files.item(i));
  //     console.log(files.item(i));      
  //   }
  //   this.$emit('filesAdded', result);
  // }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
