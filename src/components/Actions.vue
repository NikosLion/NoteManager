<template>
  <div class="actions-container" v-if='showContent'>
      <div class="box">
        <ul class="action-list">
          <li class="actions" v-on:click='displayNotes'>View Notes</li>
          <li class="actions">Create New</li>
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
      width: 220px; 
      height: calc(100vh - 55px);
      display: flex;
      flex-direction: column;
      padding-left: 0;
      border-right: 1px solid #e9ecef;
      color: #343a40;
      background: #fbfbfb;
      .action-list {
        width: 220px;
        min-height: calc(100vh - 55px);
        list-style: none;
      }
      .actions {
        color: #343a40;
        position: relative;
        margin: 0;
        display: block;
        padding: 0.75rem 1rem;
        text-decoration: none;
        background: transparent;
      }
      .actions:hover {
        background-color: #f0efef;
        cursor: pointer;
      }
  }
</style>