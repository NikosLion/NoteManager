<template>
  <div class="actions-container" v-if='showContent'>
      <div class="box">
        <ul class="action-list">
          <li class="actions" v-on:click='displayNotes'>View Notes</li>
          <li class="actions">Create Note</li>
        </ul>
      </div>
  </div>
</template>


<script>
  import { mapState, mapActions } from 'vuex';

  export default {

    computed: {
      ...mapState([
        'loginSuccessful',
      ]),
      showContent: function() {
          return this.loginSuccessful;
      }
    },
    methods: {
      ...mapActions([
        'toggleNotesVisible'
      ]),
      displayNotes() {
        this.toggleNotesVisible();
      }
    }
  }
</script>

<style scoped lang="scss">
  .actions-container {
      height: 100%;
      width: 220px; 
      display: flex;
      flex-direction: column;
      margin-top: 1px;
      padding-left: 0;
      border-right: 1px solid #e9ecef;
      color: #343a40;
      background: #fbfbfb;
      box-shadow: 1px 0px 1px #d6d6d6;
      .action-list {
        width: 220px;
        min-height: calc(100vh - 55px);
        list-style: none;
      }
      .actions {
        color: #616970;
        position: relative;
        margin: 0;
        display: block;
        padding: 0.75rem 1rem;
        text-decoration: none;
        font-size: 1.1rem;
        background: transparent;
      }
      .actions:hover {
        background-color: #f0efef;
        cursor: pointer;
      }
  }
</style>